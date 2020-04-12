import { TokenizableStringableEntity } from "./TokenizableStringableEntity";

export class Token<T extends TokenizableStringableEntity> {
  index?: number;
  length?: number;
  entity?: T;

  constructor(init?: Partial<Token<T>>) {
    Object.assign(this, init);
  }
}
