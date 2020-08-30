import { all } from "known-css-properties";
import {
  languages,
  commands,
  CompletionItem,
  ExtensionContext,
  CompletionItemKind,
  Position,
  Range,
  CompletionItemProvider,
  DocumentSelector,
} from "vscode";

const COMMANDS = {
  SELECTED: "vs-smart-css-autocomplete.selected",
};

const providers = [];

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

export function activate(context: ExtensionContext): void {
  registerCommands(context);
  registerProviders();
}

function registerProviders() {
  registerItemProvider({
    scheme: "file",
    pattern: "**/*.{css,scss,less,sass,styl}",
  });
}

const handleSelect = (commandSelected: string) => {
  console.log(`Hello <${commandSelected}>`);
};

function registerCommands(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand(COMMANDS.SELECTED, handleSelect)
  );
}

function registerItemProvider(languageFilter: DocumentSelector) {
  const providerFunction: CompletionItemProvider = {
    provideCompletionItems: (document, position) => {
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
