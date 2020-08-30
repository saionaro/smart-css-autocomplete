import { all as allCssProps } from "known-css-properties";
import {
  languages,
  CompletionItem,
  CompletionItemKind,
  Position,
  Range,
  CompletionItemProvider,
  DocumentSelector,
} from "vscode";

import { FILES_GLOB, SCHEME, COMMANDS } from "./constants";

const getItems = () => {
  return allCssProps.map((property, i) => {
    const item = new CompletionItem(property, CompletionItemKind.Field);

    item.sortText = `${i}`;
    item.preselect = i === 0;

    item.command = {
      title: "selected-notification",
      command: COMMANDS.SELECTED,
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

const registerItemProvider = (languageFilter: DocumentSelector): void => {
  languages.registerCompletionItemProvider(languageFilter, providerFunction);
};

export const registerProvider = (): void => {
  registerItemProvider({
    scheme: SCHEME,
    pattern: FILES_GLOB,
  });
};
