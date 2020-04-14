import { IConverter } from "../../../../shared/interfaces/IConverter";
import { Dictionary } from "../../../../shared/tools/Dictionary";
import { Char } from "../../../universal/orthography/model/Char";
import { Phone } from "../../../universal/orthography/model/Phone";

/**
 * See: https://www.pravopisne.cz/2012/01/pravidla-samohlasky-a-souhlasky/#jak-je-to-s-u,-e,-y/y?
 */
export class CsCharsToSimplePhonesConverter
  implements IConverter<Char[], Phone[]> {
  public dictionary = new Dictionary<string[]>({
    ů: ["ú"],
    ě: ["j", "e"],
    y: ["i"],
    ý: ["í"],
  });

  public convert(chars: Char[]): Phone[] {
    const phones: Phone[] = [];
    for (const char of chars) {
      const newPhones = this.dictionary.translateElement(
        char.toString().toLowerCase(),
      );
      for (const newPhone of newPhones) {
        phones.push(new Phone({ string: newPhone }));
      }
    }
    return phones;
  }
}
