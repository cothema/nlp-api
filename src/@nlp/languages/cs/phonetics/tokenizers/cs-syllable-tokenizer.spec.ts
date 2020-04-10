import { CsSyllableTokenizer } from "./cs-syllable-tokenizer";

describe("CsSyllableTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new CsSyllableTokenizer();

    expect(tokenizer.tokenize("Lukáš")[0].toString()).toBe("lu");
    expect(tokenizer.tokenize("Louka")[1].toString()).toBe("ka");
    expect(tokenizer.tokenize("Ouha")[0].toString()).toBe("ou");
    expect(tokenizer.tokenize("Ouha")[1].toString()).toBe("ha");
    expect(tokenizer.tokenize("Chrpa")[0].toString()).toBe("chr");
    expect(tokenizer.tokenize("Škrt")[0].toString()).toBe("škrt");
    expect(tokenizer.tokenize("škrtat")[0].toString()).toBe("škr");
    expect(tokenizer.tokenize("au")[0].toString()).toBe("au");
    expect(tokenizer.tokenize("Markétka")[0].toString()).toBe("mar");
    expect(tokenizer.tokenize("Markétka")[1].toString()).toBe("két");
    expect(tokenizer.tokenize("Markétka")[2].toString()).toBe("ka");
    expect(tokenizer.tokenize("škrabka")[0].toString()).toBe("škrap");
    expect(tokenizer.tokenize("zoo")[1].toString()).toBe("o");
    expect(tokenizer.tokenize("zoologická")[2].toString()).toBe("lo");
    expect(tokenizer.tokenize("zoologická")[3].toString()).toBe("gic");
    expect(tokenizer.tokenize("kráska")[0].toString()).toBe("krás");
    expect(tokenizer.tokenize("žbrunda")[0].toString()).toBe("žbrun");
    expect(tokenizer.tokenize("mrkat")[0].toString()).toBe("mr");
    expect(tokenizer.tokenize("uličník")[1].toString()).toBe("lič");
    expect(tokenizer.tokenize("žbluňk")[0].toString()).toBe("žbluňk");
    expect(tokenizer.tokenize("kázeň")[1].toString()).toBe("zeň");

    // TODO:
    // expect(tokenizer.tokenize("poučka")[0].toString()).toBe("po");
  });
});
