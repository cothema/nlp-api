import { CsTextToIpaConverter } from "./CsTextToIpaConverter";

describe("CsTextToIpaConverter", () => {
  test("convert", () => {
    const converter = new CsTextToIpaConverter();

    let examples = [
      ["cáč", "tsaːtʃ", 3],
      ["fixa", "fɪksa"],
      ["wix", "vɪks"],
    ];

    examples.forEach(example => {
      let result = converter.convert(example[0]);

      expect(result.join("")).toBe(example[1]);

      if (example[2] !== undefined) {
        expect(result.length).toBe(example[2]);
      }
    });
  });
});
