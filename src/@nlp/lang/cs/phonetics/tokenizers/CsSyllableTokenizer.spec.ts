import { CsSyllableTokenizer } from "./CsSyllableTokenizer";

describe("CsSyllableTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new CsSyllableTokenizer();

    expect(tokenizer.tokenizeToValues("Lukáš")[0]).toBe("lu");
    expect(tokenizer.tokenizeToValues("Louka")[1]).toBe("ka");
    expect(tokenizer.tokenizeToValues("Ouha")[0]).toBe("ou");
    expect(tokenizer.tokenizeToValues("Ouha")[1]).toBe("ha");
    expect(tokenizer.tokenizeToValues("Chrpa")[0]).toBe("chr");
    expect(tokenizer.tokenizeToValues("Škrt")[0]).toBe("škrt");
    expect(tokenizer.tokenizeToValues("škrtat")[0]).toBe("škr");
    expect(tokenizer.tokenizeToValues("au")[0]).toBe("au");
    expect(tokenizer.tokenizeToValues("Markétka")[0]).toBe("mar");
    expect(tokenizer.tokenizeToValues("Markétka")[1]).toBe("két");
    expect(tokenizer.tokenizeToValues("Markétka")[2]).toBe("ka");
    expect(tokenizer.tokenizeToValues("škrabka")[0]).toBe("škrap");
    expect(tokenizer.tokenizeToValues("zoo")[1]).toBe("o");
    expect(tokenizer.tokenizeToValues("zoologická")[2]).toBe("lo");
    expect(tokenizer.tokenizeToValues("zoologická")[3]).toBe("gic");
    expect(tokenizer.tokenizeToValues("kráska")[0]).toBe("krás");
    expect(tokenizer.tokenizeToValues("žbrunda")[0]).toBe("žbrun");
    expect(tokenizer.tokenizeToValues("mrkat")[0]).toBe("mr");
    expect(tokenizer.tokenizeToValues("uličník")[1]).toBe("lič");
    expect(tokenizer.tokenizeToValues("žbluňk")[0]).toBe("žbluňk");
    expect(tokenizer.tokenizeToValues("kázeň")[1]).toBe("zeň");
    expect(tokenizer.tokenizeToValues("cvrček")[1]).toBe("ček");

    // TODO:
    // expect(tokenizer.tokenize("poučka")[0]).toBe("po");
  });
});
