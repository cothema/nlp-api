import { Pool } from "pg";
import { PostgresDb } from "../../@db/postgres/PostgresDb";

interface DeclensionPattern {
  pattern: string;
  declensionEndings: (string | string[])[];
  life?: boolean;
  verbalType: number;
  ignoreWords?: string[];
  reliability?: number; // <=0.5: unreliable, >0.5 && <1: minor unreliability, 1 = 100% success
  gender?: number; // 0: male, 1: female, 2: it
}

export class NounDeclensionDetermination {
  private db: Pool;

  constructor() {
    this.db = PostgresDb.getPool();
  }

  static getCzechPatterns(): DeclensionPattern[] {
    const patterns: DeclensionPattern[] = [];

    // Rod střední
    patterns.push({
      pattern: "město",
      declensionEndings: [
        "o",
        "a",
        "u",
        "o",
        "o",
        ["ě", "u"],
        "em",
        "a",
        "",
        "ům",
        "a",
        "a",
        "ech",
        "y",
      ],
      verbalType: 1,
      ignoreWords: [],
      reliability: 1,
      gender: 2,
    });

    patterns.push({
      pattern: "moře",
      declensionEndings: [
        "e",
        "e",
        "i",
        "e",
        "e",
        "i",
        "em",
        "e",
        "í",
        "ím",
        "e",
        "e",
        "ích",
        "i",
      ],
      verbalType: 1,
      ignoreWords: [
        "tisíce",
        "velmoce",
        "berane",
        "nemoce",
        "kříže",
        "postoje",
        "",
      ],
      reliability: 0.5,
      gender: 2,
    });

    patterns.push({
      pattern: "kuře",
      declensionEndings: [
        "e",
        "ete",
        "eti",
        "e",
        "e",
        "eti",
        "etem",
        "ata",
        "at",
        "atům",
        "ata",
        "ata",
        "atech",
        "aty",
      ],
      verbalType: 1,
      reliability: 1,
      gender: 2,
    });

    patterns.push({
      pattern: "stavení",
      declensionEndings: [
        "ení",
        "ení",
        "ení",
        "ení",
        "ení",
        "ení",
        "ením",
        "ení",
        "ení",
        "ením",
        "ení",
        "ení",
        "eních",
        "eními",
      ],
      verbalType: 1,
      reliability: 1,
      gender: 2,
    });

    // Rod ženský
    patterns.push({
      pattern: "žena",
      declensionEndings: [
        "a",
        "y",
        "ě",
        "u",
        "o",
        "ě",
        "ou",
        "y",
        "",
        "",
        "y",
        "y",
        "ách",
        "ami",
      ],
      verbalType: 1,
      reliability: 1,
      gender: 1,
    });

    patterns.push({
      pattern: "škola",
      declensionEndings: [
        "a",
        "y",
        "e",
        "u",
        "o",
        "e",
        "ou",
        "y",
        "",
        "",
        "y",
        "y",
        "ách",
        "ami",
      ],
      verbalType: 1,
      reliability: 0.5,
      gender: 1,
    });

    patterns.push({
      pattern: "růže",
      declensionEndings: [
        "e",
        "e",
        "i",
        "i",
        "e",
        "i",
        "í",
        "e",
        "í",
        "ím",
        "e",
        "e",
        "ích",
        "emi",
      ],
      verbalType: 1,
      reliability: 0.5,
      gender: 1,
    });

    patterns.push({
      pattern: "píseň",
      declensionEndings: [
        "eň",
        "ně",
        "ni",
        "eň",
        "ni",
        "ni",
        "ní",
        "ně",
        "ní",
        "ním",
        "ně",
        "ně",
        "ních",
        "němi",
      ],
      verbalType: 1,
      reliability: 1,
      gender: 1,
    });

    patterns.push({
      pattern: "kost",
      declensionEndings: [
        "",
        "i",
        "i",
        "",
        "i",
        "i",
        "í",
        "i",
        "í",
        "em",
        "i",
        "i",
        "ech",
        "mi",
      ],
      verbalType: 1,
      reliability: 0.5,
      gender: 1,
    });

    // např. Ivuša
    patterns.push({
      pattern: "gejša",
      declensionEndings: [
        "a",
        "i",
        "e",
        "u",
        "o",
        "e",
        "ou",
        "i",
        "",
        "ám",
        "i",
        "i",
        "ách",
        "ami",
      ],
      verbalType: 1,
      reliability: 0.5,
      gender: 1,
    });

    // Rod mužský
    patterns.push({
      pattern: "pán",
      declensionEndings: [
        "án",
        "ána",
        ["ánovi", "ánu"],
        "ána",
        "ane",
        ["ánovi", "ánu"],
        "ánem",
        ["áni", "ánové"],
        "ánů",
        "ánům",
        "ány",
        ["áni", "ánové"],
        "ánech",
        "ány",
      ],
      verbalType: 1,
      life: true,
      reliability: 1,
      gender: 1,
    });

    // Odvozeno od pána
    patterns.push({
      pattern: "divák",
      declensionEndings: [
        "ák",
        "áka",
        "ákovi",
        "áka",
        "áku",
        "ákovi",
        "ákem",
        "áci",
        "áků",
        "ákům",
        "áky",
        "áci",
        "ácích",
        "áky",
      ],
      verbalType: 1,
      life: true,
      reliability: 1,
      gender: 0,
    });

    patterns.push({
      pattern: "hrad",
      declensionEndings: [
        "",
        "u",
        "u",
        "",
        "e",
        "ě",
        "em",
        "y",
        "ů",
        "ům",
        "y",
        "y",
        "ech",
        "y",
      ],
      verbalType: 1,
      life: false,
      reliability: 0.9,
      ignoreWords: ["cikán", "velbloud"],
      gender: 0,
    });

    // Odvozeno od hradu
    patterns.push({
      pattern: "les",
      declensionEndings: [
        "",
        "a",
        "u",
        "",
        "e",
        "u",
        "em",
        "y",
        "ů",
        "ům",
        "y",
        "y",
        "ech",
        "y",
      ],
      verbalType: 1,
      life: false,
      reliability: 0.5,
      ignoreWords: [],
      gender: 0,
    });

    patterns.push({
      pattern: "zámek",
      declensionEndings: [
        "ek",
        "ku",
        "ku",
        "ek",
        "ku",
        "ku",
        "kem",
        "ky",
        "ků",
        "kům",
        "ky",
        "ky",
        "cích",
        "ky",
      ],
      verbalType: 1,
      life: false,
      reliability: 0.5,
      gender: 0,
    });

    patterns.push({
      pattern: "muž",
      declensionEndings: [
        "",
        "e",
        ["ovi", "i"],
        "e",
        "i",
        ["ovi", "i"],
        "em",
        ["ové", "i"],
        "ů",
        "ům",
        "e",
        ["ové", "i"],
        "ích",
        "i",
      ],
      verbalType: 1,
      life: true,
      reliability: 0.5,
      gender: 0,
    });

    patterns.push({
      pattern: "stroj",
      declensionEndings: [
        "",
        "e",
        "i",
        "",
        "i",
        "i",
        "em",
        "e",
        "ů",
        "ům",
        "e",
        "e",
        "ích",
        "i",
      ],
      verbalType: 1,
      life: false,
      reliability: 0.5,
      gender: 0,
    });

    patterns.push({
      pattern: "předseda",
      declensionEndings: [
        "a",
        "y",
        "ovi",
        "u",
        "o",
        "ovi",
        "ou",
        "ové",
        "ů",
        "ům",
        "y",
        "ové",
        "ech",
        "y",
      ],
      verbalType: 1,
      life: true,
      reliability: 0.5,
      gender: 0,
    });

    // odvozené od předsedy
    patterns.push({
      pattern: "kolega",
      declensionEndings: [
        "ga",
        "gy",
        "govi",
        "gu",
        "go",
        "govi",
        "gou",
        "gové",
        "gů",
        "gům",
        "gy",
        "gové",
        "zích",
        "gy",
      ],
      verbalType: 1,
      life: true,
      reliability: 1,
      gender: 0,
    });

    patterns.push({
      pattern: "soudce",
      declensionEndings: [
        "e",
        "e",
        ["i", "ovi"],
        "e",
        "e",
        ["i", "ovi"],
        "em",
        "i",
        "ů",
        "ům",
        "e",
        ["i", "ové"],
        "ích",
        "i",
      ],
      verbalType: 1,
      life: true,
      reliability: 0.5,
      gender: 0,
    });

    patterns.push({
      pattern: "jiří",
      declensionEndings: [
        "í",
        "ího",
        "ímu",
        "ího",
        "í",
        "ím",
        "ím",
        "í",
        "ích",
        "ím",
        "í",
        "í",
        "ích",
        "ími",
      ],
      verbalType: 1,
      life: true,
      reliability: 0.5,
      gender: 0,
    });

    return patterns;
  }

  private static getUniqueEndings(pattern) {
    const patternUniqueEndings: {
      ending: string;
      declensions: number[]; // 1 - 7 for sg, 8 - 14 for pl
    }[] = [];
    let i = 0;
    for (let declensionEndings of pattern.declensionEndings) {
      i++;

      if (!Array.isArray(declensionEndings)) {
        declensionEndings = [declensionEndings];
      }

      for (const declensionEnding of declensionEndings) {
        let match = patternUniqueEndings.find(
          (el) => el.ending === declensionEnding,
        );
        if (!match) {
          match = {
            ending: declensionEnding,
            declensions: [],
          };
          patternUniqueEndings.push(match);
        }

        match.declensions.push(i);
      }
    }

    return patternUniqueEndings;
  }

  async browseAndDetermine() {
    const lang = "cs";

    const patterns = await NounDeclensionDetermination.getCzechPatterns();

    for (const pattern of patterns.filter((p) => p.reliability === 0.9)) {
      console.log(`Pattern: ${pattern.pattern}`);

      const patternUniqueEndings = NounDeclensionDetermination.getUniqueEndings(
        pattern,
      ).sort((a, b) => {
        // sort from longest to shortest for faster search
        return b.ending.length - a.ending.length;
      });

      try {
        const secondaryEndings = patternUniqueEndings.map((x) =>
          x.ending.length ? x.ending : `""`,
        );
        secondaryEndings.shift();

        const queryParams = [
          patternUniqueEndings.find((x) => x.declensions.find((y) => y === 1))
            .ending,
          "%" + patternUniqueEndings[0].ending,
          "{" + secondaryEndings.join(",") + "}",
          patternUniqueEndings.length - 1,
          -1 * patternUniqueEndings[0].ending.length,
          lang,
        ];

        console.log(queryParams);

        const result = await this.db.query(
          `SELECT w0.stem AS stem, w0.stem || $1 AS match
             FROM (
                    SELECT left(w.word, $5) AS stem
                    FROM word AS w
                    WHERE w.word LIKE $2 -- pick the most selective ending to get started
                      AND w.lang = $6
                  ) w0
                    CROSS JOIN unnest($3::text[]) x(dec) -- all other in an array
                    JOIN word w1 ON w1.word = w0.stem || x.dec AND lang = $6
             WHERE lang = $6
             GROUP BY w0.stem
             HAVING count(*) = $4;`,
          queryParams,
        );

        console.log(`Found ${result.rowCount} matching words.`);
        for (const resultRow of result.rows) {
          if (pattern.ignoreWords.includes(resultRow.match)) {
            console.log(`Ignoring word:`, resultRow.match);
            continue;
          }

          console.log(`Found matching word:`, resultRow.match);

          for (const patternUniqueEnding of patternUniqueEndings) {
            const insertResult = await this.db.query(
              `
              INSERT INTO cs_word_noun_specification
              (word_id,
               gender,
               declension_sg_1,
               declension_sg_2,
               declension_sg_3,
               declension_sg_4,
               declension_sg_5,
               declension_sg_6,
               declension_sg_7,
               declension_pl_1,
               declension_pl_2,
               declension_pl_3,
               declension_pl_4,
               declension_pl_5,
               declension_pl_6,
               declension_pl_7,
               verified_reliability,
               verified_by_human,
               life,
               pattern_word_id)
              WITH w_word AS (SELECT w.id AS id
                              FROM word AS w
                              WHERE w.word = $1
                                AND w.lang = $2
              ),
                   w_pattern AS (SELECT wp.id AS id
                                 FROM word AS wp
                                 WHERE wp.word = $21
                                   AND wp.lang = $2
                   )
              SELECT w_word.id,
                     $3,
                     $4,
                     $5,
                     $6,
                     $7,
                     $8,
                     $9,
                     $10,
                     $11,
                     $12,
                     $13,
                     $14,
                     $15,
                     $16,
                     $17,
                     $18,
                     $19,
                     $20,
                     w_pattern.id
              FROM w_word,
                   w_pattern
              ON CONFLICT DO NOTHING
            `,
              [
                resultRow.stem + patternUniqueEnding.ending,
                lang,
                pattern.gender,
                patternUniqueEnding.declensions.includes(1),
                patternUniqueEnding.declensions.includes(2),
                patternUniqueEnding.declensions.includes(3),
                patternUniqueEnding.declensions.includes(4),
                patternUniqueEnding.declensions.includes(5),
                patternUniqueEnding.declensions.includes(6),
                patternUniqueEnding.declensions.includes(7),
                patternUniqueEnding.declensions.includes(8),
                patternUniqueEnding.declensions.includes(9),
                patternUniqueEnding.declensions.includes(10),
                patternUniqueEnding.declensions.includes(11),
                patternUniqueEnding.declensions.includes(12),
                patternUniqueEnding.declensions.includes(13),
                patternUniqueEnding.declensions.includes(14),
                pattern.reliability * 100,
                false,
                pattern.life,
                pattern.pattern,
              ],
            );

            console.log(
              `Identified word ${
                resultRow.stem + patternUniqueEnding.ending
              } with result:`,
              insertResult.rowCount,
            );
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
}
