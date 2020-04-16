import { Token } from "./Token";
import { TokenizableStringableEntity } from "./TokenizableStringableEntity";

export class ModifiableToken<
  T extends TokenizableStringableEntity = TokenizableStringableEntity
> extends Token<T> {
  originalIndex?: number;
  originalLength?: number;
  originalEntity?: T;

  constructor(init?: Partial<ModifiableToken<T>>) {
    super();
    Object.assign(this, init);
  }

  /**
   * It will remove one entity on given index and append new entities instead of
   * it. All entities with higher indexes will be shifted right (including
   * token positions).
   * @param index
   * @param newEntities
   */
  modify(index: number, newStr: string): this {
    if (!this.originalEntity) {
      this.originalEntity = this.fragment.clone();
      this.originalIndex = this.origIndex;
      this.originalLength = this.origLength;
    }

    this.origIndex = index;
    this.origLength = newStr.length;

    this.fragment.string = this.strSplice(
      this.fragment.toString(),
      index,
      1,
      newStr,
    );
    this.shiftExistingTokens(index, newStr.length);

    return this;
  }

  private shiftExistingTokens(index: number, newStrLength: number) {
    const existingTokens = this.fragment.tokenInfoList;
    for (const existingToken of existingTokens) {
      if (existingToken.origIndex === index) {
        existingToken.origLength += newStrLength - 1;
      } else if (existingToken.origIndex > index) {
        existingToken.origIndex += newStrLength - 1;
      }
    }
  }

  private strSplice(str: string, index: number, count: number, add?: string) {
    // We cannot pass negative indexes directly to the 2nd slicing operation.
    if (index < 0) {
      index = str.length + index;
      if (index < 0) {
        index = 0;
      }
    }

    return str.slice(0, index) + (add || "") + str.slice(index + count);
  }
}
