import { IStringable } from "../../../../interface/i-stringable";
import { ITypeMarked } from "../../../../interface/i-type-marked";

export class Stringable implements IStringable, ITypeMarked {
  type = "unknown";
  string?: string;

  constructor(init?: Partial<Stringable>) {
    Object.assign(this, init);
  }

  toString(): string {
    return this.string;
  }
}
