import { Pool } from "pg";
import { PostgresDb } from "../../../postgres/PostgresDb";

export class CsWordsRepository {

  private db: Pool;

  constructor() {
    this.db = PostgresDb.getPool();
  }

  async findWordWithSpecification(word: string) {
    let dbMatchingWords = await this.db.query(`
      SELECT
        w.id as w_id, cwns.id as noun_id
      FROM word AS w
             LEFT JOIN cs_word_noun_specification cwns on w.id = cwns.word_id
      WHERE w.text = $1
        AND lang = 'cs'
    `, [word]);

    return dbMatchingWords.rows;
  }

}
