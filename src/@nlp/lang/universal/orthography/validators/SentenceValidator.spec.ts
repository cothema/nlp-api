import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";
import { SentenceValidator } from "./SentenceValidator";

describe("SentenceValidator", () => {
  test("Validate", () => {
    const validatorFactory = (sentence: string) =>
      new SentenceValidator().validate(
        new TokenizableStringableEntity({
          string: sentence,
        }),
      );

    expect(validatorFactory("This is a long sentence. Ok.")).toBe(false);
    expect(validatorFactory("Yes")).toBe(false);

    expect(validatorFactory("What is your name?")).toBe(true);
    expect(validatorFactory("Ok")).toBe(false);
  });
});
