import { TokenizableStringableEntity } from "./TokenizableStringableEntity";

export class Token<T extends TokenizableStringableEntity> {
  public index?: number;
  public length?: number;
  public entity?: T;

  public constructor(init?: Partial<Token<T>>) {
    Object.assign(this, init);
  }
}
