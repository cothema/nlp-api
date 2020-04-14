import { CharTokenizer } from "./CharTokenizer";

describe("CharTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new CharTokenizer();

    expect(tokenizer.tokenizeToValues("Lukáš")[3]).toBe("á");
    expect(tokenizer.tokenizeToValues("That's it!")[4]).toBe("'");
    expect(tokenizer.tokenizeToValues("I 💖 you!")[2]).toBe("💖");
  });
});
