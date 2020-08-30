import { all as allCssProps } from "known-css-properties";
import {
  languages,
  CompletionItem,
  CompletionItemKind,
  Position,
  Range,
  CompletionItemProvider,
  ExtensionContext,
} from "vscode";

import { COMMANDS, SELECTOR } from "./constants";
import { getStore, toAlphabetic } from "./utils";

let context: ExtensionContext;
const listCopy = [...allCssProps];

const getItems = (): CompletionItem[] => {
  const usageMap = getStore(context);

  listCopy.sort((a, b) => {
    const valA = usageMap[a] ?? 0;
    const valB = usageMap[b] ?? 0;

    return valB - valA;
  });

  return listCopy.map((property, i) => {
    const item = new CompletionItem(property, CompletionItemKind.Field);

    item.sortText = toAlphabetic(i + 1);

    item.command = {
      title: COMMANDS.SELECTED.TITLE,
      command: COMMANDS.SELECTED.CMD,
      arguments: [property],
    };

    return item;
  });
};

const providerFunction: CompletionItemProvider = {
  provideCompletionItems: (document, position) => {
    const range = new Range(new Position(position.line, 0), position);
    const lineText = document.getText(range);

    if (/:/.test(lineText)) return [];

    return getItems();
  },
};

export const registerProvider = (ctx: ExtensionContext): void => {
  context = ctx;

  languages.registerCompletionItemProvider(SELECTOR, providerFunction);
};
