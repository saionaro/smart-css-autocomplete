import * as path from "path";
// import { workspace, ExtensionContext } from "vscode";
import { all } from "known-css-properties";
import {
  workspace,
  window,
  languages,
  commands,
  Uri,
  MarkdownString,
  RelativePattern,
  Command,
  CompletionItem,
  ExtensionContext,
  CompletionItemKind,
  Position,
  Range,
  Hover,
} from "vscode";

const COMMANDS = {
  SELECTED: "vs-smart-css-autocomplete.selected",
};

// import {
//   LanguageClient,
//   LanguageClientOptions,
//   ServerOptions,
//   TransportKind,
//   // CompletionItemKind
// } from "vscode-languageclient";

let config = workspace.getConfiguration("vs-smart-css-autocomplete");

// let providerScope = config.get("autocompletionFilesScope");
let files = {};
let watchers = [];
let providers = [];
let isActiveRestoreAllConfigs = false;

// let client: LanguageClient;

const getItems = () => {
  return all.map((property, i) => {
    const item = new CompletionItem(property, CompletionItemKind.Field);

    item.sortText = `${i}`;
    item.preselect = i === 0;

    item.command = {
      title: "selected-notification",
      command: COMMANDS.SELECTED,
      arguments: [property],
    };

    return item;
  });
};

export function activate(context: ExtensionContext) {
  registerCommands(context);
  registerProviders();
}

function registerProviders() {
  const languageFilter = {
    scheme: "file",
    pattern: "**/*.{css,scss,less,sass,styl}",
  };

  registerItemProvider(languageFilter);
}

const handleSelect = (commandSelected: string) => {
  console.log(`Hello <${commandSelected}>`);
};

function registerCommands(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand(COMMANDS.SELECTED, handleSelect)
  );
}

function registerItemProvider(languageFilter) {
  const providerFunction = {
    // resolveCompletionItem: () => {}
    provideCompletionItems: (document, position, token, context) => {
      const range1 = new Range(
        new Position(Math.max(position.line - 15, 0), 0),
        new Position(position.line + 15, 0)
      );
      const lineText2 = document.getText(range1);

      console.log(lineText2);

      const range = new Range(new Position(position.line, 0), position);
      const lineText = document.getText(range);

      if (/:/.test(lineText)) return [];

      return getItems();
    },
  };

  providers.push(
    languages.registerCompletionItemProvider(languageFilter, providerFunction)
  );
}

export function deactivate(): Thenable<void> | undefined {
  return Promise.resolve();
}
