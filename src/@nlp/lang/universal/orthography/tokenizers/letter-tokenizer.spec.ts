import { LetterTokenizer } from "./letter-tokenizer";

describe("LetterTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new LetterTokenizer();

    expect(tokenizer.tokenize("Mike")[3].toString()).toBe("e");
    expect(tokenizer.tokenize("Chronology")[0].toString()).toBe("C");
    expect(tokenizer.tokenize("Chronology")[1].toString()).toBe("h");
    expect(tokenizer.tokenize("That's it!")[4].toString()).toBe("s");
    expect(tokenizer.tokenize("I 💖 you!")[2].toString()).toBe("o");
  });
});
