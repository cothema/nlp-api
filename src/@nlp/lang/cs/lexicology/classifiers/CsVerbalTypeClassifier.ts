import { Pool } from "pg";
import { PostgresDb } from "../../../../../@db/postgres/PostgresDb";
import { IClassifier } from "../../../../shared/interfaces/IClassifier";
import { LexicologyVerbalType } from "../../../universal/lexicology/enums/LexicologyVerbalType";
import { Word } from "../../../universal/orthography/model/Word";

export class CsVerbalTypeClassifier implements IClassifier<Word> {
  private db: Pool;

  constructor() {
    this.db = PostgresDb.getPool();
  }

  async classifyFromString(word: string) {
    return this.classify(new Word({
      string: word,
    }));
  }

  async classify(word: Word) {
    let dbMatchingWords = await this.db.query(`
      SELECT words.id as w_id, cwns.id as noun_id
      FROM words
             LEFT JOIN cs_words_noun_specification cwns on words.id = cwns.word_id
      WHERE word = $1
        AND lang = 'cs'
    `, [word.string]);

    if (!word.verbalType) {
      word.verbalType = [];
    }

    for (const dbMatchingWord of dbMatchingWords.rows) {
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
