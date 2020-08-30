import { commands, ExtensionContext } from "vscode";

import { COMMANDS } from "./constants";

const handleSelect = (commandSelected: string) => {
  console.log(`Hello <${commandSelected}>`);
};

export const registerCommand = (context: ExtensionContext): void => {
  context.subscriptions.push(
    commands.registerCommand(COMMANDS.SELECTED, handleSelect)
  );
};
