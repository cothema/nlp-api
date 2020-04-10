import { CharTokenizer } from "./char-tokenizer";

describe("CharTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new CharTokenizer();

    expect(tokenizer.tokenize("Lukáš")[3].toString()).toBe("á");
    expect(tokenizer.tokenize("That's it!")[4].toString()).toBe("'");
    expect(tokenizer.tokenize("I 💖 you!")[2].toString()).toBe("💖");
  });
});
