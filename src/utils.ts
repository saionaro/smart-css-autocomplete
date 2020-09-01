import { ExtensionContext } from "vscode";

import { STORAGE_KEYS, FIRST_LETTER } from "./constants";

export const toAlphabetic = (num: number): string => FIRST_LETTER.repeat(num); // TODO: replace with a little smarter approach

export const getStore = (
  context: ExtensionContext,
  isCopy = false
): Record<string, number> => {
  const map: Record<string, number> =
    context.globalState.get(STORAGE_KEYS.USAGE_MAP) ?? {};

  return isCopy ? { ...map } : map;
};
