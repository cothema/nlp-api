import { IStringable } from "../../../../shared/interfaces/IStringable";
import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { ModifiableToken } from "../../../../shared/model/ModifiableToken";
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

export class CsSimplePhoneTokenizer extends StringableTokenizer
  implements IStringableTokenizer<Phone> {
  private letterTokenizer = new CsLetterTokenizer();

  public constructor() {
    super();
    this.letterTokenizer.digraphs = this.letterTokenizer.digraphs.concat(
      CsDiphthongList.list.map((x) => new Digraph({ string: x })),
    );
  }

  public tokenize(input: IStringable): Token<Phone>[] {
    // TODO: split word to parts (prefix, root...) first
    // TODO: modifiable token

    const letterTokens = this.letterTokenizer.tokenize(input);
    const phoneTokens = [];

    for (let i = 0; letterTokens[i]; i++) {
      const letterStr = letterTokens[i].entity.toString().toLowerCase();
      const nextLetterStr = letterTokens[i + 1]
        ? letterTokens[i + 1].entity.toString().toLowerCase()
        : undefined;

      let length = 1;
      const appendPhones: string[] = [];
      if (letterStr === "ě") {
        appendPhones.push("j", "e");
      } else if (nextLetterStr && letterStr === "s" && nextLetterStr === "h") {
        length = 2;
        appendPhones.push("š");
        i++; // skip next letter
      } else if (nextLetterStr && letterStr === "t" && nextLetterStr === "h") {
        length = 2;
        appendPhones.push("t");
        i++; // skip next letter
      } else {
        appendPhones.push(letterStr);
      }

      for (const appendPhone of appendPhones) {
        phoneTokens.push(
          new Token({
            index: letterTokens[i].index,
            length,
            entity: new Phone({ string: appendPhone }),
          }),
        );
      }
    }

    return this.solveVoice(phoneTokens);
  }

  /**
   * CZ: Spodoba znělosti
   * See: https://prirucka.ujc.cas.cz/?id=909
   * See: https://www.diktatorek.cz/Scholasticus/Cesky-jazyk/Pravopis/Pravopis-skupin-souhlasek/Pravopis-souhlasek-uvnitr-slov-help.html
   */
  private solveVoice(
    phoneTokens: ModifiableToken<Phone>[],
  ): ModifiableToken<Phone>[] {
    // TODO: voiceless prepositions

    const dictionary = new CsPairConsonantsDictionary();

    for (let i = 0; phoneTokens[i]; i++) {
      switch (phoneTokens[i].entity.string) {
        case "y":
          phoneTokens[i].entity.string = "i";
          continue;
        case "ý":
          phoneTokens[i].entity.string = "í";
          continue;
      }

      if (phoneTokens[i] && !phoneTokens[i + 1]) {
        // Last phone
        /**
         * Hotfix: My rule
         */
        if (
          this.isPairConsonant(phoneTokens[i]) &&
          this.isVoicedConsonant(phoneTokens[i])
        ) {
          // [voiceless][voiced] => [voiced][voiced]
          phoneTokens[i].entity.string = dictionary.translateElement(
            phoneTokens[i].entity.toString(),
          );
        }
        break;
      } else if (
        !this.isPairConsonant(phoneTokens[i]) ||
        ["p", "t", "ť", "ch", "f", "š"].includes(
          phoneTokens[i].entity.toString(),
        ) || // Hotfix (c,č): My rule
        !CsPairConsonantList.list
          .concat(["c", "č"])
          .includes(phoneTokens[i + 1].entity.toString()) // Hotfix (c,č): My rule
      ) {
      } else if (
        // ["v", "z"].includes(phones[i].toString())
        this.isVoicedConsonant(phoneTokens[i]) &&
        this.isVoicelessConsonant(phoneTokens[i + 1])
      ) {
        // [voiced][voiceless] => [voiceless][voiceless]
        phoneTokens[i].entity.string = dictionary.translateElement(
          phoneTokens[i].entity.toString(),
        );
        i++; // skip next phone
      } else if (
        // ["f", "s"].includes(phones[i].toString())
        this.isVoicelessConsonant(phoneTokens[i]) &&
        this.isVoicedConsonant(phoneTokens[i + 1])
      ) {
        // [voiceless][voiced] => [voiced][voiced]
        phoneTokens[i].entity.string = dictionary.translateElementReverse(
          phoneTokens[i].entity.toString(),
        );
        i++; // skip next phone
      }
    }

    return phoneTokens;
  }

  private isPairConsonant(phoneToken: Token<Phone>) {
    return CsPairConsonantList.list.includes(phoneToken.entity.toString());
  }

  private isVoicedConsonant(phoneToken: Token<Phone>) {
    return CsVoicedConsonantList.list.includes(phoneToken.entity.toString());
  }

  private isVoicelessConsonant(phoneToken: Token<Phone>) {
    return CsVoicelessConsonantList.list.includes(phoneToken.entity.toString());
  }
}
