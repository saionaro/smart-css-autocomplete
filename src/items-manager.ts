import FuzzySearch from "fuzzy-search";
import {
  CompletionItem,
  CompletionItemKind,
  ExtensionContext,
  SnippetString,
} from "vscode";
import allCssProps from "./css-props.json";

import { COMMANDS, COLON, SEMICOLON, CURSOR, DEBUG } from "./constants";
import {
  getStore,
  toAlphabetic,
  getColonData,
  longEnough,
  lookupWord,
} from "./utils";
import { AbbrIndex } from "./abbr-index";
import { UsageMap, Comporator, ItemBuilder, Item, ItemKind } from "./types";

const priorityMap = allCssProps.reduce((acc, prop, index) => {
  acc[prop] = index;
  return acc;
}, {} as Record<string, number>);
const searcher = new FuzzySearch(allCssProps, []);
const abbrIndex = new AbbrIndex(allCssProps);

export const getTemplate = (
  property: string,
  prefix: string,
  suffix: string
): string => {
  const lineData = getColonData(prefix, suffix);
  let template = property;

  if (!lineData.colon) {
    template += `${COLON} ${CURSOR}`;
  }

  if (!lineData.semicolon) {
    template += SEMICOLON;
  }

  return template;
};

export const getComporator =
  (usageMap: UsageMap): Comporator =>
  (a, b) => {
    const valA = usageMap[a.value] ?? -priorityMap[a.value] ?? 0;
    const valB = usageMap[b.value] ?? -priorityMap[b.value] ?? 0;

    return valB - valA;
  };

export const getItemBuilder =
  (usageMap: UsageMap, prefix: string, suffix: string): ItemBuilder =>
  (property, index) => {
    const item = new CompletionItem(property.value, CompletionItemKind.Field);
    const usageCount = usageMap[property.value] ?? 0;

    item.command = {
      title: COMMANDS.SELECTED.TITLE,
      command: COMMANDS.SELECTED.CMD,
      arguments: [property.value],
    };

    item.detail = "";

    if (usageCount || DEBUG) {
      item.detail += `Used ${usageCount} times`;
      if (DEBUG) {
        item.detail += ` [Source: ${property.kind}]`;
        item.detail += ` [Priority: ${-priorityMap[property.value]}]`;
      }
    }

    item.filterText = property.value;
    item.sortText = toAlphabetic(index + 1);
    item.insertText = new SnippetString(
      getTemplate(property.value, prefix, suffix)
    );

    return item;
  };

export const getItems = (
  context: ExtensionContext,
  lineText: string,
  position: number
): CompletionItem[] => {
  const prefix = lineText.slice(0, position);
  const suffix = lineText.slice(position);
  const word = lookupWord(prefix);

  if (!word) return [];

  const usageMap = getStore(context);
  const result: Item[] = [];
  const addedMap = new Map<string, 1>();

  if (word.length >= 1) {
    for (const value of allCssProps) {
      if (value.startsWith(word) && longEnough(value)) {
        result.push({ value, kind: ItemKind.PREFIX });
        addedMap.set(value, 1);
      }
    }

    if (word.length >= 2) {
      const abbrItems = abbrIndex.getItem(word.split(""));

      for (const value of abbrItems) {
        if (addedMap.has(value)) continue;

        result.push({ value, kind: ItemKind.ABBR });
        addedMap.set(value, 1);
      }
    }
  }

  if (word.length > 2 && result.length < 5) {
    const fuzzyItems = searcher.search(word);

    for (const value of fuzzyItems) {
      if (longEnough(value) && !addedMap.has(value)) {
        result.push({ value, kind: ItemKind.FUZZY });
        addedMap.set(value, 1);
      }
    }
  }

  return result
    .sort(getComporator(usageMap))
    .map(getItemBuilder(usageMap, prefix, suffix));
};
