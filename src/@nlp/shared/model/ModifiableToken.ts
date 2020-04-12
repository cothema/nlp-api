import { Token } from "./Token";
import { TokenizableStringableEntity } from "./TokenizableStringableEntity";

export class ModifiableToken<T extends TokenizableStringableEntity>
  extends Token<T> {
  originalIndex?: number;
  originalLength?: number;
  originalEntity?: T;

  constructor(init?: Partial<ModifiableToken<T>>) {
    super();
    Object.assign(this, init);
  }

  /**
   * It will remove entity on given index and append new entities instead of
   * it. All entities with higher indexes will be shifted right (including
   * token positions).
   * @param index
   * @param newEntities
   */
  modify(
    index: number,
    newEntities: T[],
  ): this {
    if (!this.originalEntity) {
      this.originalEntity = this.entity.clone();
      this.originalIndex = this.index;
      this.originalLength = this.length;
    }

    this.index = index;
    this.length = newEntities.length;

    this.shiftExistingTokens();
    this.

    return this;
  }

  private shiftExistingTokens() {
    const existingTokens = this.entity.tokenInfoList;
    for (const existingToken of existingTokens) {
      if() {

      }
    }
  }
}
