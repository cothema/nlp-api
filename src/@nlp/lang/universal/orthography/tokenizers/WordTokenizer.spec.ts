import { WordTokenizer } from "./WordTokenizer";

describe("WordTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new WordTokenizer();

    expect(tokenizer.tokenizeToValues("This is a long sentence.")[4]).toBe(
      "sentence",
    );
    expect(tokenizer.tokenizeToValues("two    words")[1]).toBe("words");
    expect(tokenizer.tokenize("What is your name?").length).toBe(4);
    expect(tokenizer.tokenizeToValues("What is your name?")[3]).toBe("name");
  });
});
