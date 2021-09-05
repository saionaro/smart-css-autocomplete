import { ExtensionContext } from "vscode";

import {
  STORAGE_KEYS,
  FIRST_LETTER,
  COLON,
  SEMICOLON,
  WORD_BREAKS,
  WHITESPACE,
  BRACKETS,
} from "./constants";
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

export const lookupWord = (line: string): string => {
  let word = "";

  for (let i = line.length - 1; i >= 0; i--) {
    const letter = line[i];
    if (WORD_BREAKS.has(letter)) break;
    word = letter + word;
  }

  return word;
};

export const getColonData = (_prefix: string, suffix: string): IColonData => {
  const data = {
    colon: false,
    semicolon: false,
  };
  let val = "";
  const leadingWhitespace = suffix[0] === WHITESPACE;
  for (const char of suffix) {
    if (char === BRACKETS.CURLY.CLOSE) break;
    if (char === WHITESPACE) continue;
    if (char === COLON) {
      if (leadingWhitespace && val.length) break;
      data.colon = true;
      continue;
    }
    if (char === SEMICOLON) {
      data.semicolon = true;
      break;
    }

    val += char;
  }

  return data;
};
