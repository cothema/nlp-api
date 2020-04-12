import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";

export class Syllable extends StringableEntity implements ITypeMarked {
  type = "syllable";
  accent?: boolean;

  constructor(init?: Partial<Syllable>) {
    super();
    Object.assign(this, init);
  }
}
