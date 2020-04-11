import { StringableToken } from "../../../../shared/model/stringableToken";

export class Diphthong extends StringableToken {
  string?: string;

  constructor(init?: Partial<Diphthong>) {
    super();
    Object.assign(this, init);
  }
}
