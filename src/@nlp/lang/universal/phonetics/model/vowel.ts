import { StringableToken } from "../../../../shared/model/stringableToken";

/**
 *
 */
export class Vowel extends StringableToken {
  string?: string;

  constructor(init?: Partial<Vowel>) {
    super();
    Object.assign(this, init);
  }
}
