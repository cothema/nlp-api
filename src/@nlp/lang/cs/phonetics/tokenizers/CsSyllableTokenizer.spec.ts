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
    expect(tokenizer.tokenizeToValues("škola")[1]).toBe("la");
    expect(tokenizer.tokenizeToValues("léky")[0]).toBe("lé");
    expect(tokenizer.tokenizeToValues("lék")[0]).toBe("lék");
    expect(tokenizer.tokenizeToValues("metyl")[1]).toBe("til");
    expect(tokenizer.tokenizeToValues("methyl")[1]).toBe("til");
    expect(tokenizer.tokenizeToOriginalValues("methyl")[1]).toBe("thyl");
    expect(tokenizer.tokenizeToOriginalValues("chobot")[1]).toBe("bot");
    expect(tokenizer.tokenizeToValues("methylprednisolon")[2]).toBe("pred");
    expect(tokenizer.tokenizeToValues("Zbyněk")[1]).toBe("ňek");
    expect(tokenizer.tokenizeToValues("oves")[1]).toBe("ves");

    expect(tokenizer.tokenizeToValues("v lese")[0]).toBe("vle");
    expect(tokenizer.tokenizeToOriginalValues("v lese")[0]).toBe("v le");
    expect(tokenizer.tokenizeToOriginalValues("v lese")[1]).toBe("se");
    expect(tokenizer.tokenizeToOriginalValues("na poli")[0]).toBe("na");
    expect(tokenizer.tokenizeToOriginalValues("na poli")[1]).toBe("po");

    // TODO:
    // expect(tokenizer.tokenizeToValues("ověřit")[1]).toBe("vje");
    // expect(tokenizer.tokenizeToValues("výstavba")[1]).toBe("stav");
    // expect(tokenizer.tokenizeToValues("žbluňkls")[2]).toBe("pred");
    // expect(tokenizer.tokenizeToValues("v něm")[0]).toBe("vňem");
    // expect(tokenizer.tokenizeToValues("trpaslíček")[1]).toBe("pas");
    // expect(tokenizer.tokenizeToValues("trpaslíček").length).toBe(4);
    // expect(tokenizer.tokenizeToValues("dvě")[0]).toBe("dvje");
    // expect(tokenizer.tokenizeToValues("dvě slova").length).toBe(3);
    // expect(tokenizer.tokenizeToValues("dvě slova")[1]).toBe("slo");
    // expect(tokenizer.tokenize("poučka")[0]).toBe("po");
    // expect(tokenizer.tokenize("transdermální")[0]).toBe("trans");
    // expect(tokenizer.tokenize("transdermální")[1]).toBe("der");
    // expect(tokenizer.tokenize("transtuzumab")[0]).toBe("trans");
    // expect(tokenizer.tokenize("transtuzumab")[1]).toBe("tu");
    // expect(tokenizer.tokenize("král")[0]).toBe("král");
    // expect(tokenizer.tokenize("prcičky")[1]).toBe("cič");
    // expect(tokenizer.tokenize("vltava")[1]).toBe("ta");
  });
});
