import { StringableToken } from "../../../../shared/model/stringableToken";

export class Consonant extends StringableToken {
  string?: string;

  constructor(init?: Partial<Consonant>) {
    super();
    Object.assign(this, init);
  }
}
