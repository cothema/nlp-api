import { Sentence } from "../universal/orthography/model/Sentence";

export class SyntaxSolver {
  static solve(sentence: Sentence) {
    for (let i = 0; sentence.words[i]; i++) {
      if (
        sentence.words[i].tags.find(el => el.tagType === "verbal-types" && el.type === "adjectives")
        && sentence.words[i + 1].tags.find(el => el.tagType === "verbal-types" && el.type === "nouns")
      ) {
        sentence.words[i].tags.push({
          type: "attribute-identical", // Přívlastek shodný
          tagType: "syntax",
          probability: 0.9,
        });
      }
    }
  }
}
