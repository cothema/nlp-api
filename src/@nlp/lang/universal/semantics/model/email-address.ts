import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";

export class EmailAddress extends StringableEntity implements ITypeMarked {
  type = "email-address";

  constructor(init?: Partial<EmailAddress>) {
    super();
    Object.assign(this, init);
  }
}
