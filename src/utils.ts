import { ExtensionContext } from "vscode";

import { STORAGE_KEYS } from "./constants";
import { convertToTitle } from "./to-excel-title";

export const toAlphabetic = (num: number): string => convertToTitle(num);

export const getStore = (
  context: ExtensionContext,
  isCopy = false
): Record<string, number> => {
  const map: Record<string, number> =
    context.globalState.get(STORAGE_KEYS.USAGE_MAP) ?? {};

  return isCopy ? { ...map } : map;
};
