import { Stringable } from "../../orthography/model/stringable";

export class Syllable extends Stringable {
  string?: string;

  constructor(init?: Partial<Syllable>) {
    super();
    Object.assign(this, init);
  }
}
