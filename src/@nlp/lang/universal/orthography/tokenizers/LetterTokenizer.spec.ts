import { LetterTokenizer } from "./LetterTokenizer";

describe("LetterTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new LetterTokenizer();

    expect(tokenizer.tokenizeToValues("Mike")[3]).toBe("e");
    expect(tokenizer.tokenizeToValues("Chronology")[0]).toBe("C");
    expect(tokenizer.tokenizeToValues("Chronology")[1]).toBe("h");
    expect(tokenizer.tokenizeToValues("That's it!")[4]).toBe("s");
    expect(tokenizer.tokenizeToValues("I 💖 you!")[2]).toBe("o");
    expect(tokenizer.tokenize("I 💖 you!")[1].origIndex).toBe(4);
    expect(tokenizer.tokenizeToValues("původ")[1]).toBe("ů");
  });
});
