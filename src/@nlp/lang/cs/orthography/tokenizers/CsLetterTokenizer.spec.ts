import { CsLetterTokenizer } from "./CsLetterTokenizer";

describe("CsLetterTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new CsLetterTokenizer();

    expect(tokenizer.tokenizeToValues("Lukáš")[3]).toBe("á");
    expect(tokenizer.tokenizeToValues("Chrpa")[0]).toBe("Ch");
    expect(tokenizer.tokenizeToValues("Chrpa")[1]).toBe("r");
    expect(tokenizer.tokenizeToValues("Já Tě 💖 lásko!")[5]).toBe("á");
  });
});
