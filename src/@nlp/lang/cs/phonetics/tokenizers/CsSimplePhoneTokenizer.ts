import { IStringable } from "../../../../shared/interfaces/IStringable";
import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { Token } from "../../../../shared/model/Token";
import { StringableTokenizer } from "../../../../shared/tokenizers/StringableTokenizer";
import { Digraph } from "../../../universal/orthography/model/Digraph";
import { Letter } from "../../../universal/orthography/model/Letter";
import { Meta } from "../../../universal/orthography/model/Meta";
import { Phone } from "../../../universal/orthography/model/Phone";
import { Voice } from "../../../universal/orthography/model/Voice";
import { CsLetterTokenizer } from "../../orthography/tokenizers/CsLetterTokenizer";
import { CsPairConsonantsDictionary } from "../dictionaries/CsPairConsonantsDictionary";
import { CsDiphthongList } from "../lists/CsDiphthongList";
import { CsPairConsonantList } from "../lists/CsPairConsonantList";
import { CsPhoneRules } from "../rules/CsPhoneRules";
import { CsPhoneTools } from "../rules/CsPhoneTools";

export class CsSimplePhoneTokenizer extends StringableTokenizer
  implements IStringableTokenizer<Phone> {
  private letterTokenizer = new CsLetterTokenizer();

  constructor() {
    super();
    this.letterTokenizer.digraphs = this.letterTokenizer.digraphs.concat(
      CsDiphthongList.list.map((x) => new Digraph({ string: x })),
    );
  }

  tokenize(input: IStringable): Token<Phone, Letter>[] {
    // TODO: split word to parts (prefix, root...) first
    // TODO: modifiable token

    const letterTokens = this.letterTokenizer.tokenize(input);
    const phoneTokens: Token<Phone>[] = [];

    for (let i = 0; letterTokens[i]; i++) {
      const letterStr = letterTokens[i].fragment.toString().toLowerCase();
      const nextLetterStr = letterTokens[i + 1]?.fragment
        .toString()
        .toLowerCase();
      const prevLetterStr = letterTokens[i - 1]?.fragment
        .toString()
        .toLowerCase();

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
              origIndex: letterTokens[i].origIndex,
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
            origIndex: letterTokens[i].origIndex,
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
            origIndex: letterTokens[i].origIndex,
            origLength: length,
            fragment: new Phone({
              string: "š",
            }),
            orig: letterTokens,
          }),
        );
        i += length - 1; // skip next letter
      } else if (nextLetterStr && letterStr === "t" && nextLetterStr === "h") {
        const length = 2;
        phoneTokens.push(
          new Token({
            origIndex: letterTokens[i].origIndex,
            origLength: length,
            fragment: new Phone({
              string: "t",
            }),
            orig: letterTokens,
          }),
        );
        i += length - 1; // skip next letter
      } else if (letterStr === " ") {
        // do nothing
      } else {
        phoneTokens.push(
          new Token({
            origIndex: letterTokens[i].origIndex,
            origLength: Array.from(letterStr).length,
            fragment: new Phone({
              string: letterStr,
            }),
            orig: letterTokens,
          }),
        );
      }
    }

    return this.solveVoice(phoneTokens).entity.phones;
  }

  /**
   * CZ: Spodoba znělosti
   *
   * @see https://prirucka.ujc.cas.cz/?id=909
   * @see https://www.diktatorek.cz/Scholasticus/Cesky-jazyk/Pravopis/Pravopis-skupin-souhlasek/Pravopis-souhlasek-uvnitr-slov-help.html
   */
  private solveVoice(
    phoneTokensIn: Token<Phone, Letter>[],
  ): Meta<Voice> {
    let meta = new Meta<Voice>();
    meta.entity = new Voice();

    meta.entity.phones = [];
    for (let i = 0; phoneTokensIn[i]; i++) {
      meta.entity.phones.push(phoneTokensIn[i]);
    }

    let phoneTokens = meta.entity.phones;

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
          CsPhoneTools.isPairConsonant(phoneTokens[i]) &&
          CsPhoneTools.isVoicedConsonant(phoneTokens[i])
        ) {
          // [voiceless][voiced] => [voiced][voiced]
          phoneTokens[i].fragment.string = dictionary.translateElement(
            phoneTokens[i].fragment.toString(),
          );
        }
        break;
      } else if (
        !CsPhoneTools.isPairConsonant(phoneTokens[i]) ||
        ["p", "t", "ť", "ch", "f", "š"].includes(
          phoneTokens[i].fragment.toString(),
        ) || // Hotfix (c,č): My rule
        !CsPairConsonantList.list
          .concat(["c", "č"])
          .includes(phoneTokens[i + 1].fragment.toString()) // Hotfix (c,č): My rule
      ) {
      } else if (
        // ["v", "z"].includes(phones[i].toString())
        CsPhoneTools.isVoicedConsonant(phoneTokens[i]) &&
        CsPhoneTools.isVoicelessConsonant(phoneTokens[i + 1])
      ) {
        // [voiced][voiceless] => [voiceless][voiceless]
        phoneTokens[i].fragment.string = dictionary.translateElement(
          phoneTokens[i].fragment.toString(),
        );
        i++; // skip next phone
      } else if (
        // ["f", "s"].includes(phones[i].toString())
        CsPhoneTools.isVoicelessConsonant(phoneTokens[i]) &&
        CsPhoneTools.isVoicedConsonant(phoneTokens[i + 1])
      ) {
        // [voiceless][voiced] => [voiced][voiced]
        // e.g. pro-sb-a
        phoneTokens[i].fragment.string = dictionary.translateElementReverse(
          phoneTokens[i].fragment.toString(),
        );
        i++; // skip next phone
      }

      let ruleOut = CsPhoneRules.applyRuleById(meta, 1, i);
      if (ruleOut.cluster > 0) {
        i += ruleOut.cluster - 1;
      }
    }

    meta.entity.phones = phoneTokens;

    return meta;
  }

}
