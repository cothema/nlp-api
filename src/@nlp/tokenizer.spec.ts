import { Sentence } from "./lang/universal/orthography/model/sentence";
import { Tokenizer } from "./tokenizer";

describe("Tokenizer", () => {
  test("Get words", () => {
    const exampleInputs = [
      "This is my sentence.",
      "Lukáš šel do dalekého supermarketu.",
      "Kde jsou ty klíče od našeho domu?",
      "Tak už pojď!",
    ];
    const expectedWordCounts = [
      4,
      5,
      7,
      3,
    ];

    for (let i = 0; exampleInputs[i]; i++) {
      expect(Tokenizer.getWords(new Sentence(exampleInputs[i])).length).toBe(expectedWordCounts[i]);
    }
  });
});
