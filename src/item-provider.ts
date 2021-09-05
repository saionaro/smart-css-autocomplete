import {
  languages,
  Position,
  Range,
  CompletionItemProvider,
  ExtensionContext,
} from "vscode";

import { SELECTOR, ALPHABET, ITEMS_LOOKUP } from "./constants";
import { getItems } from "./items-manager";

let context: ExtensionContext;

const providerFunction: CompletionItemProvider = {
  provideCompletionItems: (document, position) => {
    const lineStart = new Position(
      position.line,
      Math.max(0, position.character - ITEMS_LOOKUP)
    );
    const range = new Range(
      lineStart,
      lineStart.translate(0, position.character + ITEMS_LOOKUP)
    );
    const lineText = document.getText(range);

    return getItems(context, lineText, position.character);
  },
};

export const registerProvider = (ctx: ExtensionContext): void => {
  context = ctx;
  ctx.subscriptions.push(
    languages.registerCompletionItemProvider(
      SELECTOR,
      providerFunction,
      ...ALPHABET
    )
  );
};
