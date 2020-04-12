import { IStringable } from "../../../../shared/interfaces/IStringable";
import { ModifiableToken } from "../../../../shared/model/ModifiableToken";
import { StringableEntity } from "../../../../shared/model/StringableEntity";
import { Token } from "../../../../shared/model/Token";
import { StringableTokenizer } from "../../../../shared/tokenizers/StringableTokenizer";
import { Digraph } from "../../../universal/orthography/model/Digraph";
import { Phone } from "../../../universal/orthography/model/Phone";
import { CsLetterTokenizer } from "../../orthography/tokenizers/CsLetterTokenizer";
import { CsPairConsonantsDictionary } from "../dictionaries/CsPairConsonantsDictionary";
import { CsDiphthongList } from "../lists/CsDiphthongList";
import { CsPairConsonantList } from "../lists/CsPairConsonantList";
import { CsVoicedConsonantList } from "../lists/CsVoicedConsonantList";
import { CsVoicelessConsonantList } from "../lists/CsVoicelessConsonantList";

export class CsSimplePhoneTokenizer
  extends StringableTokenizer {

  private tokenizer = new CsLetterTokenizer();

  constructor() {
    super();
    this.tokenizer.digraphs = this.tokenizer.digraphs.concat(
      CsDiphthongList.list.map(x => new Digraph({ string: x })),
    );
  }

  tokenize(input: IStringable): Token<Phone>[] {
    // TODO: split word to parts (prefix, root...) first

    const inputModifiable = new StringableEntity({
      string: input.toString().replace("ě", "je"),
    });

    const letterTokens = this.tokenizer.tokenize(inputModifiable);
    const phoneTokens = [];

    for (let i = 0, tokenIndex = 0; letterTokens[i]; i++, tokenIndex++) {
      phoneTokens.push(
        new ModifiableToken({
          index: tokenIndex,
          length: letterTokens[i].entity.toString().length,
          entity: new Phone({ string: letterTokens[i].entity.toString().toLowerCase() }),
          originalEntity: letterTokens[i].entity.toString(),
          originalIndex: tokenIndex,
          originalLength: letterTokens[i].entity.toString().length,
        }),
      );
      tokenIndex += letterTokens[i].entity.toString().length - 1;
    }

    return this.solveVoice(phoneTokens);
  }

  /**
   * CZ: Spodoba znělosti
   * See: https://prirucka.ujc.cas.cz/?id=909
   * See: https://www.diktatorek.cz/Scholasticus/Cesky-jazyk/Pravopis/Pravopis-skupin-souhlasek/Pravopis-souhlasek-uvnitr-slov-help.html
   */
  private solveVoice(phoneTokens: ModifiableToken<Phone>[]): ModifiableToken<Phone>[] {
    // TODO: voiceless prepositions

    const dictionary = new CsPairConsonantsDictionary();

    for (let i = 0; phoneTokens[i]; i++) {
      if (phoneTokens[i] && !phoneTokens[i + 1]) {
        // Last phone
        /**
         * Hotfix: My rule
         */
        if (
          CsPairConsonantList.list.includes(phoneTokens[i].entity.toString())
          && CsVoicedConsonantList.list.includes(phoneTokens[i].entity.toString())
        ) {
          // [voiceless][voiced] => [voiced][voiced]
          phoneTokens[i].entity.string = dictionary.translateElement(
            phoneTokens[i].entity.toString(),
          );
        }
        break;
      } else if (
        !CsPairConsonantList.list.includes(phoneTokens[i].entity.toString())
        || ["p", "t", "ť", "ch", "f", "š"].includes(phoneTokens[i].entity.toString()) // Hotfix (c,č): My rule
        || !CsPairConsonantList.list.concat(["c", "č"]).includes(phoneTokens[i + 1].entity.toString()) // Hotfix (c,č): My rule
      ) {
        continue;
      } else if (
        // ["v", "z"].includes(phones[i].toString())
        CsVoicedConsonantList.list.includes(phoneTokens[i].entity.toString())
        && CsVoicelessConsonantList.list.includes(phoneTokens[i + 1].entity.toString())
      ) {
        // [voiced][voiceless] => [voiceless][voiceless]
        phoneTokens[i].entity.string = dictionary.translateElement(phoneTokens[i].entity.toString());
        i++; // skip next phone
      } else if (
        //["f", "s"].includes(phones[i].toString())
        CsVoicelessConsonantList.list.includes(phoneTokens[i].toString())
        && CsVoicedConsonantList.list.includes(phoneTokens[i + 1].toString())
      ) {
        // [voiceless][voiced] => [voiced][voiced]
        phoneTokens[i].entity.string = dictionary.translateElementReverse(phoneTokens[i].entity.toString());
        i++; // skip next phone
      }
    }

    return phoneTokens;
  }

}
