import { ExtensionContext } from "vscode";

import { registerCommand } from "./command";
import { registerProvider } from "./item-provider";
import { STORAGE_KEYS } from "./constants";

export const activate = (context: ExtensionContext): void => {
  context.globalState.setKeysForSync([STORAGE_KEYS.USAGE_MAP]);
  registerCommand(context);
  registerProvider(context);
};

export const deactivate = (): Thenable<void> => {
  return Promise.resolve();
};
