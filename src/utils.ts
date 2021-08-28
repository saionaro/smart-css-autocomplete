import { ExtensionContext } from "vscode";

import { STORAGE_KEYS, FIRST_LETTER, COLON, SEMICOLON } from "./constants";
import { UsageMap, IColonData } from "./types";

export const toAlphabetic = (num: number): string => FIRST_LETTER.repeat(num);

export const getStore = (
  context: ExtensionContext,
  isCopy = false
): UsageMap => {
  const map: UsageMap = context.globalState.get(STORAGE_KEYS.USAGE_MAP) ?? {};

  return isCopy ? { ...map } : map;
};

export const longEnough = (prop: string): boolean => prop.length > 1;

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
