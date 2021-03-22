import { RemoveDiacriticsNormalizer } from "./RemoveDiacriticsNormalizer";

describe("RemoveDiacriticsNormalizer", () => {
  test("NormalizeString", () => {
    const normalizer = new RemoveDiacriticsNormalizer();

    expect(normalizer.normalizeString("Lukáš")).toBe("Lukas");
    expect(normalizer.normalizeString("Lukáš")[3]).toBe("a");
  });
});
