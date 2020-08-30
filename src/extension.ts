import { ExtensionContext } from "vscode";

import { registerCommand } from "./command";
import { registerProvider } from "./item-provider";

export function activate(context: ExtensionContext): void {
  registerCommand(context);
  registerProvider();
}

export function deactivate(): Thenable<void> | undefined {
  return Promise.resolve();
}
