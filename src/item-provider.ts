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

import { COMMANDS, SELECTOR } from "./constants";
import { getStore, toAlphabetic } from "./utils";

let context: ExtensionContext;

const getItems = (prefix: string): CompletionItem[] => {
  const usageMap = getStore(context);

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

    item.insertText = new SnippetString(`${property}: $0;`);

    return item;
  });
};

const providerFunction: CompletionItemProvider = {
  provideCompletionItems: (document, position) => {
    const range = new Range(new Position(position.line, 0), position);
    const lineText = document.getText(range);

    if (/:/.test(lineText)) return [];

    return getItems(lineText.trim());
  },
};

export const registerProvider = (ctx: ExtensionContext): void => {
  context = ctx;

  languages.registerCompletionItemProvider(SELECTOR, providerFunction);
};
