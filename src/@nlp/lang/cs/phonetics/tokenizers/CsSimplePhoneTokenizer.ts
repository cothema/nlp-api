import { IStringable } from "../../../../shared/interfaces/IStringable";
import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { Token } from "../../../../shared/model/Token";
import { StringableTokenizer } from "../../../../shared/tokenizers/StringableTokenizer";
import { Digraph } from "../../../universal/orthography/model/Digraph";
import { Letter } from "../../../universal/orthography/model/Letter";
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

  public tokenize(input: IStringable): Token<Phone, Letter>[] {
    // TODO: split word to parts (prefix, root...) first
    // TODO: modifiable token

    const letterTokens = this.letterTokenizer.tokenize(input);
    const phoneTokens: Token<Phone>[] = [];

    for (let i = 0, charI = 0; letterTokens[i]; i++, charI++) {
      const letterStr = letterTokens[i].fragment.toString().toLowerCase();
      const nextLetterStr = letterTokens[i + 1]?.fragment.toString().toLowerCase();
      const prevLetterStr = letterTokens[i - 1]?.fragment.toString().toLowerCase();

      if (letterStr === "ě") {
        if (prevLetterStr === "d") {
          phoneTokens[phoneTokens.length - 1].fragment.string = "ď";
        } else if (prevLetterStr === "t") {
          phoneTokens[phoneTokens.length - 1].fragment.string = "ť";
        } else if (prevLetterStr === "n") {
          phoneTokens[phoneTokens.length - 1].fragment.string = "ň";
        } else {
          phoneTokens.push(
            new Token({
              origIndex: i,
              origLength: 1,
              fragment: new Phone({
                string: "j",
              }),
              orig: letterTokens,
            }),
          );
        }
        phoneTokens.push(
          new Token({
            origIndex: i,
            origLength: 1,
            fragment: new Phone({
              string: "e",
            }),
            orig: letterTokens,
          }),
        );
      } else if (nextLetterStr && letterStr === "s" && nextLetterStr === "h") {
        const length = 2;
        phoneTokens.push(
          new Token({
            origIndex: i,
            origLength: length,
            fragment: new Phone({
              string: "š",
            }),
            orig: letterTokens,
          }),
        );
        charI += length - 1;
        i += length - 1; // skip next letter
      } else if (nextLetterStr && letterStr === "t" && nextLetterStr === "h") {
        const length = 2;
        phoneTokens.push(
          new Token({
            origIndex: i,
            origLength: length,
            fragment: new Phone({
              string: "t",
            }),
            orig: letterTokens,
          }),
        );
        charI += length - 1;
        i += length - 1; // skip next letter
      } else {
        phoneTokens.push(
          new Token({
            origIndex: charI,
            origLength: Array.from(letterStr).length,
            fragment: new Phone({
              string: letterStr,
            }),
            orig: letterTokens,
          }),
        );
        charI += Array.from(letterStr).length - 1;
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
    phoneTokens: Token<Phone, Letter>[],
  ): Token<Phone, Letter>[] {
    // TODO: voiceless prepositions

    const dictionary = new CsPairConsonantsDictionary();

    for (let i = 0; phoneTokens[i]; i++) {
      switch (phoneTokens[i].fragment.string) {
        case "y":
          phoneTokens[i].fragment.string = "i";
          continue;
        case "ý":
          phoneTokens[i].fragment.string = "í";
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
          phoneTokens[i].fragment.string = dictionary.translateElement(
            phoneTokens[i].fragment.toString(),
          );
        }
        break;
      } else if (
        !this.isPairConsonant(phoneTokens[i]) ||
        ["p", "t", "ť", "ch", "f", "š"].includes(
          phoneTokens[i].fragment.toString(),
        ) || // Hotfix (c,č): My rule
        !CsPairConsonantList.list
          .concat(["c", "č"])
          .includes(phoneTokens[i + 1].fragment.toString()) // Hotfix (c,č): My rule
      ) {
      } else if (
        // ["v", "z"].includes(phones[i].toString())
        this.isVoicedConsonant(phoneTokens[i]) &&
        this.isVoicelessConsonant(phoneTokens[i + 1])
      ) {
        // [voiced][voiceless] => [voiceless][voiceless]
        phoneTokens[i].fragment.string = dictionary.translateElement(
          phoneTokens[i].fragment.toString(),
        );
        i++; // skip next phone
      } else if (
        // ["f", "s"].includes(phones[i].toString())
        this.isVoicelessConsonant(phoneTokens[i]) &&
        this.isVoicedConsonant(phoneTokens[i + 1])
      ) {
        // [voiceless][voiced] => [voiced][voiced]
        phoneTokens[i].fragment.string = dictionary.translateElementReverse(
          phoneTokens[i].fragment.toString(),
        );
        i++; // skip next phone
      }
    }

    return phoneTokens;
  }

  private isPairConsonant(phoneToken: Token<Phone>) {
    return CsPairConsonantList.list.includes(phoneToken.fragment.toString());
  }

  private isVoicedConsonant(phoneToken: Token<Phone>) {
    return CsVoicedConsonantList.list.includes(phoneToken.fragment.toString());
  }

  private isVoicelessConsonant(phoneToken: Token<Phone>) {
    return CsVoicelessConsonantList.list.includes(
      phoneToken.fragment.toString(),
    );
  }
}
