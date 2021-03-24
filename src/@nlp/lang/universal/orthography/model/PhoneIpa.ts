import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

/**
 * IPA phone transcription
 * @see https://en.wikipedia.org/wiki/International_Phonetic_Alphabet
 */
export class PhoneIpa extends TokenizableStringableEntity implements ITypeMarked {
  type = "phone-ipa";

  constructor(init?: Partial<PhoneIpa>) {
    super();
    Object.assign(this, init);
  }
}
