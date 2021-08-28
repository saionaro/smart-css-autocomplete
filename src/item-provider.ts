import {
  languages,
  Position,
  Range,
  CompletionItemProvider,
  ExtensionContext,
} from "vscode";

import { SELECTOR, ALPHABET } from "./constants";
import { getItems } from "./items-manager";

let context: ExtensionContext;

const providerFunction: CompletionItemProvider = {
  provideCompletionItems: (document, position) => {
    const lineStart = new Position(position.line, 0);
    const range = new Range(lineStart, lineStart.translate(0, 100));
    const lineText = document.getText(range);
    const prefix = lineText.slice(0, position.character);

    return getItems(context, prefix.trim().toLowerCase(), lineText.trim());
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
