import { IStringable } from "../interfaces/IStringable";
import { ITypeMarked } from "../interfaces/ITypeMarked";

export class StringableEntity implements IStringable, ITypeMarked {
  public type = "unknown";
  public string?: string;

  public constructor(init?: Partial<StringableEntity>) {
    Object.assign(this, init);
  }

  public toString(): string {
    return this.string;
  }

  /**
   * You should call e.g. new StringableEntity(entity.clone()) to be able
   * to class fully with methods.
   */
  public clone(): StringableEntity {
    return new StringableEntity(this);
  }
}
