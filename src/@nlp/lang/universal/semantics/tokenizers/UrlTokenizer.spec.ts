import { UrlTokenizer } from "./UrlTokenizer";

describe("UrlTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new UrlTokenizer();

    expect(
      tokenizer.tokenizeToEntities("Mike has a website: example.com").length,
    ).toBe(1);
    expect(
      tokenizer.tokenizeToEntities("My email is: email@example.com").length,
    ).toBe(0);
    expect(
      tokenizer.tokenizeToValues("My website is: https://example.com/")[0],
    ).toBe("https://example.com/");
    expect(
      tokenizer.tokenizeToEntities(
        "My email is: https://example.com/ or https://example.cz/",
      ).length,
    ).toBe(2);
    expect(
      tokenizer.tokenizeToValues(
        "My email is: https://example.com/ or https://example.cz/",
      )[1],
    ).toBe("https://example.cz/");
    expect(tokenizer.tokenize("Email: example.com")[0].index).toBe(7);
    expect(tokenizer.tokenize("Email: example.com")[0].length).toBe(11);
  });
});
