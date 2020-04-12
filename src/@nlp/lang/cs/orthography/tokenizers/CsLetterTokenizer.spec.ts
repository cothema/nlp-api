import { CsLetterTokenizer } from "./CsLetterTokenizer";

describe("CsLetterTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new CsLetterTokenizer();

    expect(tokenizer.tokenize("Lukáš")[3].toString()).toBe("á");
    expect(tokenizer.tokenize("Chrpa")[0].toString()).toBe("Ch");
    expect(tokenizer.tokenize("Chrpa")[1].toString()).toBe("r");
    expect(tokenizer.tokenize("Já Tě 💖 lásko!")[5].toString()).toBe("á");
  });
});
