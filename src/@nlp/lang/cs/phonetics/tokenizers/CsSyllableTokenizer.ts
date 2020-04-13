import { IStringable } from "../../../../shared/interfaces/IStringable";
import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { Token } from "../../../../shared/model/Token";
import { StringableTokenizer } from "../../../../shared/tokenizers/StringableTokenizer";
import { Phone } from "../../../universal/orthography/model/Phone";
import { Syllable } from "../../../universal/phonetics/model/Syllable";
import { CsDiphthongList } from "../lists/CsDiphthongList";
import { CsVowelList } from "../lists/CsVowelList";
import { CsSimplePhoneTokenizer } from "./CsSimplePhoneTokenizer";

export class CsSyllableTokenizer
  extends StringableTokenizer
  implements IStringableTokenizer<Syllable> {

  private newSyllableBuffer: string;
  private syllablesBuffer: Token<Syllable>[];
  private vowelCounter: number;
  private consonantCounter: number;

  tokenize(input: IStringable): Token<Syllable>[] {
    this.clearBuffer();

    const phoneTokens = new CsSimplePhoneTokenizer().tokenize(input);

    for (let i = 0; phoneTokens[i]; i++) {
      this.newSyllableBuffer += phoneTokens[i];

      if (!phoneTokens[i + 1]) {
        // Solve last phone
        this.pushNewSyllable();
      }

      if (
        this.isVowel(phoneTokens[i])
      ) {
        // Is vowel
        if (
          (
            phoneTokens[i + 1]
            && phoneTokens[i + 2]
            && !this.isVowel(phoneTokens[i + 1])
            && this.isVowel(phoneTokens[i + 2])
          )
          ||
          (
            phoneTokens[i + 1]
            && this.isVowel(phoneTokens[i + 1])
          )
          ||
          (
            phoneTokens[i + 1]
            && phoneTokens[i + 2]
            && !this.isVowel(phoneTokens[i + 1])
            && this.isVowel(phoneTokens[i + 2])
          )
          ||
          (
            phoneTokens[i + 1]
            && phoneTokens[i + 2]
            && !phoneTokens[i + 3]
            && !this.isVowel(phoneTokens[i + 1])
            && this.isVowel(phoneTokens[i + 2])
          )
        ) {
          this.pushNewSyllable();
          continue;
        }

        this.vowelCounter++;
      } else {
        // Is consonant
        if (
          (
            phoneTokens[i + 1]
            && phoneTokens [i + 2]
            && this.vowelCounter
            && !this.isVowel(phoneTokens[i + 1])
            && this.isVowel(phoneTokens[i + 2])
          )
          ||
          (
            phoneTokens[i + 1]
            && phoneTokens [i + 2]
            && phoneTokens [i + 3]
            && !phoneTokens [i + 4]
            && !this.isVowel(phoneTokens[i + 1])
            && this.isVowel(phoneTokens[i + 2])
            && !this.isVowel(phoneTokens[i + 3])
          )
          ||
          (
            phoneTokens[i + 1]
            && phoneTokens[i + 2]
            && !phoneTokens[i + 3]
            && !this.isVowel(phoneTokens[i + 1])
            && this.isVowel(phoneTokens[i + 2])
          )
        ) {
          this.pushNewSyllable();
          continue;
        }

        this.consonantCounter++;
      }
    }

    return this.syllablesBuffer;
  }

  private clearBuffer() {
    this.newSyllableBuffer = "";
    this.syllablesBuffer = [];
    this.vowelCounter = 0;
    this.consonantCounter = 0;
  }

  private isVowel(phoneToken: Token<Phone>) {
    return CsVowelList.list
      .concat(CsDiphthongList.list)
      .includes(phoneToken.entity.toString());
  }

  private pushNewSyllable() {
    if (this.newSyllableBuffer.length) {
      this.syllablesBuffer.push(
        new Syllable({ string: this.newSyllableBuffer }),
      );
    }
    this.newSyllableBuffer = "";
    this.vowelCounter = 0;
    this.consonantCounter = 0;
  }
}
