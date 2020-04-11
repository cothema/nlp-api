import { StringableToken } from "../../../../shared/model/stringableToken";

export class Syllable extends StringableToken {
  string?: string;

  constructor(init?: Partial<Syllable>) {
    super();
    Object.assign(this, init);
  }
}
