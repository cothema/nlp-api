import { EmailAddressTokenizer } from "./EmailAddressTokenizer";

describe("EmailAddressTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new EmailAddressTokenizer();

    expect(
      tokenizer.tokenizeToEntities("Mike has a website: example.com").length,
    ).toBe(0);
    expect(
      tokenizer.tokenizeToEntities("My email is: email@example.com").length,
    ).toBe(1);
    expect(
      tokenizer.tokenizeToValues("My email is: email@example.com")[0],
    ).toBe("email@example.com");
    expect(
      tokenizer.tokenizeToEntities(
        "My email is: email@example.com or email2@example.cz",
      ).length,
    ).toBe(2);
    expect(
      tokenizer.tokenizeToValues(
        "My email is: email@example.com or email2@example.cz",
      )[1],
    ).toBe("email2@example.cz");
    expect(tokenizer.tokenize("Email: email@example.com")[0].index).toBe(7);
    expect(tokenizer.tokenize("Email: email@example.com")[0].length).toBe(17);
  });
});
