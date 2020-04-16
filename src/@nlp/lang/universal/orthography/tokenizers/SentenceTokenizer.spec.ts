import { SentenceTokenizer } from "./SentenceTokenizer";

describe("SentenceTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new SentenceTokenizer();
    expect(tokenizer.tokenizeToValues("This is a long sentence. Ok.")[1]).toBe(
      "Ok.",
    );
    expect(tokenizer.tokenize("What is your name? Mike.").length).toBe(2);
  });
});
