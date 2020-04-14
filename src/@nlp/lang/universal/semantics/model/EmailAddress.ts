import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

export class EmailAddress extends TokenizableStringableEntity
  implements ITypeMarked {
  public type = "email-address";

  public constructor(init?: Partial<EmailAddress>) {
    super();
    Object.assign(this, init);
  }
}
