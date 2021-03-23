import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { Token } from "../../../../shared/model/Token";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";
import { Letter } from "./Letter";
import { Phone } from "./Phone";

/**
 * String of Phones
 */
export class Voice extends TokenizableStringableEntity implements ITypeMarked {
  type = "voice";
  phones: Token<Phone, Letter>[];

  constructor(init?: Partial<Voice>) {
    super();
    Object.assign(this, init);
  }
}
