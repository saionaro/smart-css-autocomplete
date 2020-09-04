import { all as allCssProps } from "known-css-properties";
import {
  CompletionItem,
  CompletionItemKind,
  ExtensionContext,
  SnippetString,
} from "vscode";

import { COMMANDS, COLON, SEMICOLON, CURSOR } from "./constants";
import { getStore, toAlphabetic, getColonData } from "./utils";
import { UsageMap, Comporator, ItemBuilder } from "./types";

export const getTemplate = (property: string, lineText: string): string => {
  const lineData = getColonData(lineText);
  let template = property;

  if (!lineData.colon) {
    template += `${COLON} ${CURSOR}`;
  }

  if (!lineData.semicolon) {
    template += SEMICOLON;
  }

  return template;
};

export const getComporator = (usageMap: UsageMap): Comporator => (a, b) => {
  const valA = usageMap[a] ?? 0;
  const valB = usageMap[b] ?? 0;

  return valB - valA;
};

export const getItemBuilder = (
  usageMap: UsageMap,
  lineText: string
): ItemBuilder => (property, num) => {
  const item = new CompletionItem(property, CompletionItemKind.Field);
  const usageCount = usageMap[property] ?? 0;

  item.command = {
    title: COMMANDS.SELECTED.TITLE,
    command: COMMANDS.SELECTED.CMD,
    arguments: [property],
  };

  if (usageCount) {
    item.detail = `Usage: ${usageCount} times`;
  }

  item.sortText = toAlphabetic(num + 1);
  item.insertText = new SnippetString(getTemplate(property, lineText));

  return item;
};

export const getItems = (
  context: ExtensionContext,
  prefix: string,
  lineText: string
): CompletionItem[] => {
  const prefixData = getColonData(prefix);

  if (prefixData.colon || prefixData.semicolon) return [];

  const usageMap = getStore(context);

  return allCssProps
    .filter((prop) => prop.startsWith(prefix)) // TODO: deside to use fuzzy search here
    .sort(getComporator(usageMap))
    .map(getItemBuilder(usageMap, lineText));
};
