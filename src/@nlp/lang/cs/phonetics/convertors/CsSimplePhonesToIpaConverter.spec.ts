import { CsSimplePhoneTokenizer } from "../tokenizers/CsSimplePhoneTokenizer";
import { CsSimplePhonesToIpaConverter } from "./CsSimplePhonesToIpaConverter";

describe("CsSimplePhonesToIpaConverter", () => {
  test("convert", () => {
    const phoneTokenizer = new CsSimplePhoneTokenizer();
    const converter = new CsSimplePhonesToIpaConverter();

    let examples = [
      ["cáč", "tsaːtʃ", 3],
      ["fixa", "fɪksa"],
      ["wix", "vɪks"],
    ];

    examples.forEach(example => {
      let phones = phoneTokenizer.tokenize(example[0]).map(token => {
        return token.fragment;
      });

      let result = converter.convert(phones);

      expect(result.join("")).toBe(example[1]);

      if (example[2] !== undefined) {
        expect(result.length).toBe(example[2]);
      }
    });
  });
});
