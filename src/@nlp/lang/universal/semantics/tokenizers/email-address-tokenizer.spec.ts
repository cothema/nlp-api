import { EmailAddressTokenizer } from "./email-address-tokenizer";

describe("EmailAddressTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new EmailAddressTokenizer();

    expect(tokenizer.tokenize("Mike has a website: example.com").length).toBe(0);
    expect(tokenizer.tokenize("My email is: email@example.com").length).toBe(1);
    expect(tokenizer.tokenize("My email is: email@example.com")[0].toString()).toBe("email@example.com");
    expect(tokenizer.tokenize("My email is: email@example.com or email2@example.cz").length).toBe(2);
    expect(tokenizer.tokenize("My email is: email@example.com or email2@example.cz")[1].toString()).toBe("email2@example.cz");
    expect(tokenizer.tokenize("Email: email@example.com")[0].tokenInfo.originalIndex).toBe(7);
    expect(tokenizer.tokenize("Email: email@example.com")[0].tokenInfo.originalLength).toBe(17);
  });
});
