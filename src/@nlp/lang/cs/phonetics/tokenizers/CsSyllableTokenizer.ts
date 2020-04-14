import { IStringable } from "../../../../shared/interfaces/IStringable";
import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { Token } from "../../../../shared/model/Token";
import { StringableTokenizer } from "../../../../shared/tokenizers/StringableTokenizer";
import { Phone } from "../../../universal/orthography/model/Phone";
import { Syllable } from "../../../universal/phonetics/model/Syllable";
import { CsDiphthongList } from "../lists/CsDiphthongList";
import { CsVowelList } from "../lists/CsVowelList";
import { CsSimplePhoneTokenizer } from "./CsSimplePhoneTokenizer";

export class CsSyllableTokenizer extends StringableTokenizer
  implements IStringableTokenizer<Syllable> {
  private newSyllableBuffer: Token<Phone>[];
  private syllablesBuffer: Token<Syllable>[];
  private vowelCounter: number;
  private consonantCounter: number;

  public tokenize(input: IStringable): Token<Syllable>[] {
    this.clearBuffer();

    const phoneTokens = new CsSimplePhoneTokenizer().tokenize(input);

    for (let i = 0; phoneTokens[i]; i++) {
      if (phoneTokens[i].entity.toString() === " ") {
        // this.pushNewSyllable();
        // TODO: prepositions vs new words
        continue;
      } else {
        this.newSyllableBuffer.push(phoneTokens[i]);
      }

      if (!phoneTokens[i + 1]) {
        // Solve last phone
        this.pushNewSyllable();
      }

      if (this.isVowel(phoneTokens[i])) {
        // Is vowel
        if (
          (phoneTokens[i + 1] &&
            phoneTokens[i + 2] &&
            !this.isVowel(phoneTokens[i + 1]) &&
            this.isVowel(phoneTokens[i + 2])) ||
          (phoneTokens[i + 1] && this.isVowel(phoneTokens[i + 1])) ||
          (phoneTokens[i + 1] &&
            phoneTokens[i + 2] &&
            !this.isVowel(phoneTokens[i + 1]) &&
            this.isVowel(phoneTokens[i + 2])) ||
          (phoneTokens[i + 1] &&
            phoneTokens[i + 2] &&
            !phoneTokens[i + 3] &&
            !this.isVowel(phoneTokens[i + 1]) &&
            this.isVowel(phoneTokens[i + 2]))
        ) {
          this.pushNewSyllable();
          continue;
        }

        this.vowelCounter++;
      } else {
        // Is consonant
        if (
          (this.vowelCounter && phoneTokens[i + 2]) || // TODO: regexp: if no vowel till the end, no cut
          (phoneTokens[i + 1] &&
            phoneTokens[i + 2] &&
            this.vowelCounter &&
            !this.isVowel(phoneTokens[i + 1]) &&
            this.isVowel(phoneTokens[i + 2])) ||
          (phoneTokens[i + 1] &&
            phoneTokens[i + 2] &&
            phoneTokens[i + 3] &&
            !phoneTokens[i + 4] &&
            !this.isVowel(phoneTokens[i + 1]) &&
            this.isVowel(phoneTokens[i + 2]) &&
            !this.isVowel(phoneTokens[i + 3])) ||
          (phoneTokens[i + 1] &&
            phoneTokens[i + 2] &&
            !phoneTokens[i + 3] &&
            !this.isVowel(phoneTokens[i + 1]) &&
            this.isVowel(phoneTokens[i + 2]))
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
    this.newSyllableBuffer = [];
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
        new Token({
          entity: new Syllable({
            string: this.newSyllableBuffer
              .map((x) => x.entity.toString())
              .join(""),
          }),
        }),
      );
    }
    this.newSyllableBuffer = [];
    this.vowelCounter = 0;
    this.consonantCounter = 0;
  }
}
