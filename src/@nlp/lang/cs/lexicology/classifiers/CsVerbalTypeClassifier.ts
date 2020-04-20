import { CsWordsRepository } from "../../../../../@db/repository/lang/cs/CsWordsRepository";
import { IClassifier } from "../../../../shared/interfaces/IClassifier";
import { LexicologyVerbalType } from "../../../universal/lexicology/enums/LexicologyVerbalType";
import { Word } from "../../../universal/orthography/model/Word";

export class CsVerbalTypeClassifier implements IClassifier<Word> {
  private csWordsRepository: CsWordsRepository = new CsWordsRepository();

  constructor() {
  }

  async classifyFromString(word: string) {
    return this.classify(new Word({
      string: word,
    }));
  }

  async classify(word: Word) {
    let dbMatchingWords = await this.csWordsRepository.findWordWithSpecification(word.string);

    if (!word.verbalType) {
      word.verbalType = [];
    }

    for (const dbMatchingWord of dbMatchingWords) {
      if (dbMatchingWord["noun_id"]) {
        word.verbalType.push(
          {
            type: LexicologyVerbalType.noun,
            probability: 0.9,
            lang: "cs",
          },
        );
      } else {
        word.verbalType.push(
          {
            probability: 0.9,
            lang: "cs",
          },
        );
      }
    }

    return word;
  }

}
