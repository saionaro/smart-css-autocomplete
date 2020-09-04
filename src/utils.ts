import { ExtensionContext } from "vscode";

import { STORAGE_KEYS, FIRST_LETTER, COLON } from "./constants";

export const toAlphabetic = (num: number): string => FIRST_LETTER.repeat(num); // TODO: replace with a little smarter approach

export const getStore = (
  context: ExtensionContext,
  isCopy = false
): Record<string, number> => {
  const map: Record<string, number> =
    context.globalState.get(STORAGE_KEYS.USAGE_MAP) ?? {};

  return isCopy ? { ...map } : map;
};

export const hasColon = (text: string): boolean => {
  for (let i = 0; i < text.length; i++) {
    if (text[i] === COLON) return true;
  }

  return false;
};
