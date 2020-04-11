import { IStringable } from "../../../../shared/interfaces/i-stringable";
import { Phone } from "../../../universal/orthography/model/phone";
import { Syllable } from "../../../universal/phonetics/model/syllable";
import { CsDiphthongList } from "../lists/cs-diphthong-list";
import { CsVowelList } from "../lists/cs-vowel-list";
import { CsSimplePhoneTokenizer } from "./cs-simple-phone-tokenizer";

export class CsSyllableTokenizer {

  private newSyllableBuffer: string;
  private syllablesBuffer: Syllable[];
  private vowelCounter: number;
  private consonantCounter: number;

  tokenize(input: IStringable): Syllable[] {
    this.clearBuffer();

    const phones = new CsSimplePhoneTokenizer().tokenize(input);

    for (let i = 0; phones[i]; i++) {
      this.newSyllableBuffer += phones[i];

      if (!phones[i + 1]) {
        // Solve last phone
        this.pushNewSyllable();
      }

      if (
        this.isVowel(phones[i])
      ) {
        // Is vowel
        if (
          (
            phones[i + 1]
            && phones[i + 2]
            && !this.isVowel(phones[i + 1])
            && this.isVowel(phones[i + 2])
          )
          ||
          (
            phones[i + 1]
            && this.isVowel(phones[i + 1])
          )
          ||
          (
            phones[i + 1]
            && phones[i + 2]
            && !this.isVowel(phones[i + 1])
            && this.isVowel(phones[i + 2])
          )
          ||
          (
            phones[i + 1]
            && phones[i + 2]
            && !phones[i + 3]
            && !this.isVowel(phones[i + 1])
            && this.isVowel(phones[i + 2])
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
            phones[i + 1]
            && phones [i + 2]
            && this.vowelCounter
            && !this.isVowel(phones[i + 1])
            && this.isVowel(phones[i + 2])
          )
          ||
          (
            phones[i + 1]
            && phones [i + 2]
            && phones [i + 3]
            && !phones [i + 4]
            && !this.isVowel(phones[i + 1])
            && this.isVowel(phones[i + 2])
            && !this.isVowel(phones[i + 3])
          )
          ||
          (
            phones[i + 1]
            && phones[i + 2]
            && !phones[i + 3]
            && !this.isVowel(phones[i + 1])
            && this.isVowel(phones[i + 2])
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

  private isVowel(phone: Phone) {
    return CsVowelList.list.concat(CsDiphthongList.list).includes(phone.toString());
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
