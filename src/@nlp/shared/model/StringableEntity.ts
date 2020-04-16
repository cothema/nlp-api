import { IStringable } from "../interfaces/IStringable";
import { ITypeMarked } from "../interfaces/ITypeMarked";

export class StringableEntity implements IStringable, ITypeMarked {
  type = "unknown";
  string?: string;

  constructor(init?: Partial<StringableEntity>) {
    Object.assign(this, init);
  }

  toString(): string {
    return this.string;
  }

  /**
   * You should call e.g. new StringableEntity(entity.clone()) to be able
   * to class fully with methods.
   */
  clone(): StringableEntity {
    return new StringableEntity(this);
  }
}
