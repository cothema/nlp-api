import { Stringable } from "../../orthography/model/stringable";

/**
 *
 */
export class Vowel extends Stringable {
  string?: string;

  constructor(init?: Partial<Vowel>) {
    super();
    Object.assign(this, init);
  }
}
