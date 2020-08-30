import { ExtensionContext } from "vscode";

import { registerCommand } from "./command";
import { registerProvider } from "./item-provider";

export const activate = (context: ExtensionContext): void => {
  registerCommand(context);
  registerProvider(context);
};

export const deactivate = (): Thenable<void> | undefined => {
  return Promise.resolve();
};
