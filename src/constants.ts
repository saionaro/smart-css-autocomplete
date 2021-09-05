export const TITLE = "vs-smart-css-autocomplete";
export const SCHEME = "file";
export const FILES_GLOB = "**/*.{css,scss,less,sass,styl}";

export const SELECTOR = {
  scheme: SCHEME,
  pattern: FILES_GLOB,
};

export const STORAGE_KEYS = {
  USAGE_MAP: `${TITLE}.usage`,
};

export const COMMANDS = {
  SELECTED: {
    TITLE: "selected-notification",
    CMD: `${TITLE}.selected`,
  },
};

export const ITEMS_LOOKUP = 50;
export const FIRST_LETTER = "a";
export const COLON = ":";
export const SEMICOLON = ";";
export const WHITESPACE = " ";
export const CURSOR = "$0";
export const ALPHABET = "abcdefghijklmnopqrstuvwxyz-";
export const PROPS_SEPARATOR = "-";
export const BRACKETS = {
  CURLY: {
    OPEN: "{",
    CLOSE: "}",
  },
};
export const DEBUG = false;
export const WORD_BREAKS = new Set([
  SEMICOLON,
  WHITESPACE,
  BRACKETS.CURLY.OPEN,
  BRACKETS.CURLY.CLOSE,
]);
