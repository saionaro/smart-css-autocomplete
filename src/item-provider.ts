import { all as allCssProps } from "known-css-properties";
import {
  languages,
  CompletionItem,
  CompletionItemKind,
  Position,
  Range,
  CompletionItemProvider,
  ExtensionContext,
  SnippetString,
} from "vscode";

import { COMMANDS, SELECTOR, COLON } from "./constants";
import { getStore, toAlphabetic, getColonData } from "./utils";

let context: ExtensionContext;

const getItems = (prefix: string, lineText: string): CompletionItem[] => {
  const usageMap = getStore(context);

  console.log(prefix);
  console.log(lineText);

  const prefixData = getColonData(prefix);

  if (prefixData.colon || prefixData.semicolon) return [];

  const listCopy = allCssProps
    .filter((prop) => prop.startsWith(prefix)) // TODO: deside to use fuzzy search here
    .sort((a, b) => {
      const valA = usageMap[a] ?? 0;
      const valB = usageMap[b] ?? 0;

      return valB - valA;
    });

  return listCopy.map((property, i) => {
    const item = new CompletionItem(property, CompletionItemKind.Field);

    item.sortText = toAlphabetic(i + 1);

    const usageCount = usageMap[property] ?? 0;

    if (usageCount) {
      item.detail = `Usage: ${usageCount} times`;
    }

    item.command = {
      title: COMMANDS.SELECTED.TITLE,
      command: COMMANDS.SELECTED.CMD,
      arguments: [property],
    };

    const lineData = getColonData(lineText);
    let template = property;

    if (!lineData.colon) {
      template += `${COLON} $0`;
    }

    if (!lineData.semicolon) {
      template += ";";
    }

    item.insertText = new SnippetString(template);

    return item;
  });
};

const providerFunction: CompletionItemProvider = {
  provideCompletionItems: (document, position) => {
    const lineStart = new Position(position.line, 0);
    const range = new Range(lineStart, lineStart.translate(0, 100));
    const lineText = document.getText(range);
    const prefix = lineText.slice(0, position.character);

    return getItems(prefix.trim(), lineText.trim());
  },
};

export const registerProvider = (ctx: ExtensionContext): void => {
  context = ctx;

  languages.registerCompletionItemProvider(SELECTOR, providerFunction);
};
