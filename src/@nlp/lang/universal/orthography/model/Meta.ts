import { IRule } from "../../../../shared/interfaces/IRule";
import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

/**
 * Meta object
 */
export class Meta<T> extends TokenizableStringableEntity implements ITypeMarked {
  type = "meta";
  entity: T;
  rulesApplied: IRule<T>[] = [];

  constructor(init?: Partial<Meta<T>>) {
    super();
    Object.assign(this, init);
  }
}
