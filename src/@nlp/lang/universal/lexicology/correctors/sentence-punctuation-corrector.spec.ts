import { Sentence } from "../../orthography/model/sentence";
import { SentencePunctuationCorrector } from "./sentence-punctuation-corrector";

describe("SentencePunctuationCorrector", () => {
  test("Fix", () => {
    const corrector = new SentencePunctuationCorrector();

    expect(corrector.fixAll(new Sentence({ string: "This is me .. " })).toString()).toBe("This is me…");
    expect(corrector.fixAll(new Sentence({ string: " What's wrong??" })).toString()).toBe("What's wrong?");
    expect(corrector.fixAll(new Sentence({ string: "thank you" })).toString()).toBe("Thank you.");
    expect(corrector.fixAll(new Sentence({ string: "štěstí" })).toString()).toBe("Štěstí.");
  });
});
