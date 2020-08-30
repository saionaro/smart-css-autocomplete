import { commands, ExtensionContext } from "vscode";

import { COMMANDS, STORAGE_KEYS } from "./constants";
import { getStore } from "./utils";

let context: ExtensionContext;

const handleSelect = (cmd: string) => {
  const store = getStore(context, true);

  if (!store[cmd]) store[cmd] = 0;

  store[cmd]++;

  context.globalState.update(STORAGE_KEYS.USAGE_MAP, store);
};

export const registerCommand = (ctx: ExtensionContext): void => {
  context = ctx;

  context.subscriptions.push(
    commands.registerCommand(COMMANDS.SELECTED.CMD, handleSelect)
  );
};
