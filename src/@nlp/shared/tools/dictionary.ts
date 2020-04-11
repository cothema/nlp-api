import { IDictionary } from "../interfaces/i-dictionary";

export class Dictionary<Output = string> {

  constructor(
    public dictionary: IDictionary<Output>,
  ) {
  }

  translateElement(input: string): Output | undefined {
    if (this.dictionary.hasOwnProperty(input)) {
      return this.dictionary[input];
    }
    return undefined;
  }

  translateElementReverse(input: Output): string | undefined {
    return Object.keys(this.dictionary).find(x => this.dictionary[x] === input);
  }

  translateArray(input: string[]): Output[] {
    const out = [];
    for (const str of input) {
      out.push(this.translateElement(str));
    }
    return out;
  }

  translateArrayReverse(input: Output[]): string[] {
    const out = [];
    for (const str of input) {
      out.push(this.translateElementReverse(str));
    }
    return out;
  }
}
