import { CompletionItem } from "vscode";

export interface IColonData {
  colon: boolean;
  semicolon: boolean;
}

export type UsageMap = Record<string, number>;

export enum ItemKind {
  PREFIX = "prefix",
  FUZZY = "fuzzy",
  ABBR = "abbr",
}
export interface Item {
  value: string;
  kind: ItemKind;
}

export type Comporator = (a: Item, b: Item) => number;

export type ItemBuilder = (property: Item, num: number) => CompletionItem;

export type Node = {
  children: Record<string, Node>;
  vals: string[];
};
