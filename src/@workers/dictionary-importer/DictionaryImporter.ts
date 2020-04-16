import { Pool, QueryResult } from "pg";
import { PostgresDb } from "../../@db/postgres/PostgresDb";
import { DictionaryLoader } from "../../@nlp/DictionaryLoader";

export class DictionaryImporter {
  private db: Pool;

  constructor() {
    this.db = PostgresDb.getPool();
  }

  async import(): Promise<void> {
    const lang = "cs";

    const words = await DictionaryLoader.load("cs", "words_cs");

    const promises: Promise<QueryResult<any>>[] = [];

    for (let word of words) {
      word = word.trim();

      const promise = this.db.query(
        "INSERT INTO words (word, lang) VALUES ($1, $2) ON CONFLICT DO NOTHING",
        [word, lang],
      );
      promise
        .then(() => {
          console.log(`Word ${word} added`);
        })
        .catch((e) => {
          console.error(e);
        });
      promises.push(promise);
    }

    await Promise.all(promises);
  }
}
