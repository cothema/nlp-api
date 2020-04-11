import { IStringable } from "../../../../shared/interfaces/i-stringable";
import { Digraph } from "../../../universal/orthography/model/digraph";
import { Phone } from "../../../universal/orthography/model/phone";
import { StringableToken } from "../../../../shared/model/stringableToken";
import { CsLetterTokenizer } from "../../orthography/tokenizers/cs-letter-tokenizer";
import { CsPairConsonantsDictionary } from "../dictionaries/cs-pair-consonants-dictionary";
import { CsDiphthongList } from "../lists/cs-diphthong-list";
import { CsPairConsonantList } from "../lists/cs-pair-consonant-list";
import { CsVoicedConsonantList } from "../lists/cs-voiced-consonant-list";
import { CsVoicelessConsonantList } from "../lists/cs-voiceless-consonant-list";

export class CsSimplePhoneTokenizer {

  private tokenizer = new CsLetterTokenizer();

  constructor() {
    this.tokenizer.digraphs = this.tokenizer.digraphs.concat(
      CsDiphthongList.list.map(x => new Digraph({ string: x })),
    );
  }

  tokenize(input: IStringable): Phone[] {
    // TODO: split word to parts (prefix, root...) first

    const inputModifiable = new StringableToken({
      string: input.toString().replace("ě", "je"),
    });

    const phones = this.tokenizer.tokenize(inputModifiable).map(
      x => new Phone({ string: x.toString().toLowerCase() }),
    );

    return this.solveVoice(phones);
  }

  /**
   * CZ: Spodoba znělosti
   * See: https://prirucka.ujc.cas.cz/?id=909
   * See: https://www.diktatorek.cz/Scholasticus/Cesky-jazyk/Pravopis/Pravopis-skupin-souhlasek/Pravopis-souhlasek-uvnitr-slov-help.html
   */
  private solveVoice(phones: Phone[]): Phone[] {
    // TODO: voiceless prepositions

    const dictionary = new CsPairConsonantsDictionary();

    for (let i = 0; phones[i]; i++) {
      if (phones[i] && !phones[i + 1]) {
        // Last phone
        /**
         * Hotfix: My rule
         */
        if (
          CsPairConsonantList.list.includes(phones[i].toString())
          && CsVoicedConsonantList.list.includes(phones[i].toString())
        ) {
          // [voiceless][voiced] => [voiced][voiced]
          phones[i].string = dictionary.translateElement(phones[i].toString());
        }
        break;
      } else if (
        !CsPairConsonantList.list.includes(phones[i].toString())
        || ["p", "t", "ť", "ch", "f", "š"].includes(phones[i].toString()) // Hotfix (c,č): My rule
        || !CsPairConsonantList.list.concat(["c", "č"]).includes(phones[i + 1].toString()) // Hotfix (c,č): My rule
      ) {
        continue;
      } else if (
        // ["v", "z"].includes(phones[i].toString())
        CsVoicedConsonantList.list.includes(phones[i].toString())
        && CsVoicelessConsonantList.list.includes(phones[i + 1].toString())
      ) {
        // [voiced][voiceless] => [voiceless][voiceless]
        phones[i].string = dictionary.translateElement(phones[i].toString());
        i++; // skip next phone
      } else if (
        //["f", "s"].includes(phones[i].toString())
        CsVoicelessConsonantList.list.includes(phones[i].toString())
        && CsVoicedConsonantList.list.includes(phones[i + 1].toString())
      ) {
        // [voiceless][voiced] => [voiced][voiced]
        phones[i].string = dictionary.translateElementReverse(phones[i].toString());
        i++; // skip next phone
      }
    }

    return phones;
  }

}
