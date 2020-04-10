import { Stringable } from "../../orthography/model/stringable";

export class Diphthong extends Stringable {
  string?: string;

  constructor(init?: Partial<Diphthong>) {
    super();
    Object.assign(this, init);
  }
}
