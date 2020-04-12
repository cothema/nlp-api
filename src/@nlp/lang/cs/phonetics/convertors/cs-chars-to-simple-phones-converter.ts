import { IConverter } from "../../../../shared/interfaces/IConverter";
import { Char } from "../../../universal/orthography/model/char";
import { Phone } from "../../../universal/orthography/model/phone";
import { Dictionary } from "../../../../shared/tools/Dictionary";

/**
 * See: https://www.pravopisne.cz/2012/01/pravidla-samohlasky-a-souhlasky/#jak-je-to-s-u,-e,-y/y?
 */
export class CsCharsToSimplePhonesConverter implements IConverter<Char[], Phone[]> {
  dictionary = new Dictionary<string[]>({
    "ů": ["ú"],
    "ě": ["j", "e"],
    "y": ["i"],
    "ý": ["í"],
  });

  convert(chars: Char[]): Phone[] {
    const phones: Phone[] = [];
    for (const char of chars) {
      let newPhones = this.dictionary.translateElement(char.toString().toLowerCase());
      for (const newPhone of newPhones) {
        phones.push(newPhone);
      }
    }
    return phones;
  }
}
