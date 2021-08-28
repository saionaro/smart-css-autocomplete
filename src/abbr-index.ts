import { PROPS_SEPARATOR } from "./constants";
import { Node } from "./types";

const getNode = (): Node => ({ children: {}, vals: [] });

export class AbbrIndex {
  private index: Node;
  constructor(private props: string[]) {
    this.index = getNode();
    this.buildIndex(this.props);
  }

  pushItem(path: string[], item: string): void {
    let target = this.index;

    for (let i = 0; i < path.length; i++) {
      if (!target.children[path[i]]) {
        target.children[path[i]] = getNode();
      }

      target = target.children[path[i]];

      if (i === path.length - 1) {
        target.vals.push(item);
      }
    }
  }

  getItem(path: string[]): string[] {
    let target = this.index;

    for (let i = 0; i < path.length; i++) {
      if (!target.children[path[i]]) break;
      target = target.children[path[i]];
      if (i === path.length - 1) {
        return target.vals;
      }
    }

    return [];
  }

  private buildIndex(items: string[]): void {
    for (const p of items) {
      const parts = p.split(PROPS_SEPARATOR);
      if (parts.length > 1) {
        const abbr = parts.map((part) => part[0]);
        this.pushItem(abbr, p);
      }
    }
  }
}
