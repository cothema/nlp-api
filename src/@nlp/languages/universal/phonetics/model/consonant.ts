import { Stringable } from "../../orthography/model/stringable";

export class Consonant extends Stringable {
  string?: string;

  constructor(init?: Partial<Consonant>) {
    super();
    Object.assign(this, init);
  }
}
