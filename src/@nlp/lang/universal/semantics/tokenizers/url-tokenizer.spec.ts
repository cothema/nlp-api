import { EmailAddressTokenizer } from "./email-address-tokenizer";
import { UrlTokenizer } from "./url-tokenizer";

describe("UrlTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new UrlTokenizer();

    expect(tokenizer.tokenize("Mike has a website: example.com").length).toBe(1);
    expect(tokenizer.tokenize("My email is: email@example.com").length).toBe(0);
    expect(tokenizer.tokenize("My website is: https://example.com/")[0].toString()).toBe("https://example.com/");
    expect(tokenizer.tokenize("My email is: https://example.com/ or https://example.cz/").length).toBe(2);
    expect(tokenizer.tokenize("My email is: https://example.com/ or https://example.cz/")[1].toString()).toBe("https://example.cz/");
    expect(tokenizer.tokenize("Email: example.com")[0].tokenInfo.originalIndex).toBe(7);
    expect(tokenizer.tokenize("Email: example.com")[0].tokenInfo.originalLength).toBe(11);
  });
});
