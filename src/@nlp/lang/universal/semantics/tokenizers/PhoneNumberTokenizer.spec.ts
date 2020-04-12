import { PhoneNumberTokenizer } from "./phone-number-tokenizer";

describe("PhoneNumberTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new PhoneNumberTokenizer();

    expect(tokenizer.tokenizeToEntities("My phone number is +420 123456789.").length).toBe(1);
    expect(tokenizer.tokenizeToValues("My phone number is 123456789.")[0]).toBe("123456789");

    // expect(tokenizer.tokenize("My phone number is +420 123 456 789.").length).toBe(1);
    // expect(tokenizer.tokenize("My phone number is 123 456 789.")[0]).toBe("123 456 789");
  });
});
