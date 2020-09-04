import { CompletionItem } from "vscode";

export interface IColonData {
  colon: boolean;
  semicolon: boolean;
}

export type UsageMap = Record<string, number>;

export type Comporator = (a: string, b: string) => number;

export type ItemBuilder = (property: string, num: number) => CompletionItem;
