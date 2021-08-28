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

export const FIRST_LETTER = "a";
export const COLON = ":";
export const SEMICOLON = ";";
export const CURSOR = "$0";
export const ALPHABET = "abcdefghijklmnopqrstuvwxyz-";
export const PROPS_SEPARATOR = "-";
export const DEBUG = false;
