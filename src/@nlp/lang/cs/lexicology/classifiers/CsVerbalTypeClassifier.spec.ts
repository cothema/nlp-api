import { LexicologyVerbalType } from "../../../universal/lexicology/enums/LexicologyVerbalType";
import { CsVerbalTypeClassifier } from "./CsVerbalTypeClassifier";

describe("CsVerbalTypeClassifier", () => {
  test("Classify (DB)", async () => {
    if (process.env.NLP20_TESTS_USE_DB !== "1") {
      return;
    }
    const classifier = new CsVerbalTypeClassifier();

    expect(
      (await classifier.classifyFromString("aparátu"))
        .verbalType.filter(x => x.lang === 'cs' && x.type === LexicologyVerbalType.noun)
        .length,
    ).toBeGreaterThan(0);
    expect(
      (await classifier.classifyFromString("kočka"))
        .verbalType.filter(x => x.lang === 'cs')
        .length,
    ).toBeGreaterThan(0);
  });
});
