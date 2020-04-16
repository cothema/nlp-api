import { Dictionary } from "../../../../shared/tools/Dictionary";

export class CsPairConsonantsDictionary extends Dictionary {
  constructor() {
    super({
      b: "p",
      d: "t",
      ď: "ť",
      g: "k",
      h: "ch",
      v: "f",
      z: "s",
      ž: "š",
    });
  }
}
