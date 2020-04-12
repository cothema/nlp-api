import { Token } from "./Token";

export class ModifiableToken<T> extends Token<T> {
  originalIndex?: number;
  originalLength?: number;
  originalEntityString?: string;

  constructor(init?: Partial<ModifiableToken<T>>) {
    super();
    Object.assign(this, init);
  }
}
