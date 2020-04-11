import { Char } from "../../../universal/orthography/model/char";
import { CsCharsToSimplePhonesConverter } from "./cs-chars-to-simple-phones-converter";

describe("CsCharsToSimplePhonesConverter", () => {
  test("convert", () => {
    const converter = new CsCharsToSimplePhonesConverter();

    expect(converter.convert([
      new Char({
        string: "ě",
      }),
    ])[0].toString()).toBe("j".toString());
  });
});
