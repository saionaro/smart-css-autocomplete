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

export const A_CODE = 97;
export const Z_CODE = 122;
