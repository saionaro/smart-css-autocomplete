import { ExtensionContext } from "vscode";

import { STORAGE_KEYS, FIRST_LETTER, COLON, SEMICOLON } from "./constants";

export const toAlphabetic = (num: number): string => FIRST_LETTER.repeat(num); // TODO: replace with a little smarter approach

export const getStore = (
  context: ExtensionContext,
  isCopy = false
): Record<string, number> => {
  const map: Record<string, number> =
    context.globalState.get(STORAGE_KEYS.USAGE_MAP) ?? {};

  return isCopy ? { ...map } : map;
};

interface IColonData {
  colon: boolean;
  semicolon: boolean;
}

export const getColonData = (text: string): IColonData => {
  const data = {
    colon: false,
    semicolon: text[text.length - 1] === SEMICOLON,
  };

  for (let i = 0; i < text.length; i++) {
    if (text[i] === COLON) {
      data.colon = true;

      break;
    }
  }

  return data;
};
