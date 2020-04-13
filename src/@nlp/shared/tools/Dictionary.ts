import { IDictionary } from "../interfaces/IDictionary";

export class Dictionary<Output = string> {
  public constructor(public dictionary: IDictionary<Output>) {}

  public translateElement(input: string): Output | undefined {
    if (this.dictionary.hasOwnProperty(input)) {
      return this.dictionary[input];
    }
    return undefined;
  }

  public translateElementReverse(input: Output): string | undefined {
    return Object.keys(this.dictionary).find(
      (x) => this.dictionary[x] === input,
    );
  }

  public translateArray(input: string[]): Output[] {
    const out = [];
    for (const str of input) {
      out.push(this.translateElement(str));
    }
    return out;
  }

  public translateArrayReverse(input: Output[]): string[] {
    const out = [];
    for (const str of input) {
      out.push(this.translateElementReverse(str));
    }
    return out;
  }
}
