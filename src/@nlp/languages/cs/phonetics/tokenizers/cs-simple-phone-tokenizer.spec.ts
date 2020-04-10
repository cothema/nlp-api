import { CsSimplePhoneTokenizer } from "./cs-simple-phone-tokenizer";

describe("CsSimplePhoneTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new CsSimplePhoneTokenizer();

    expect(tokenizer.tokenize("Lukáš")[3].toString()).toBe("á");
    expect(tokenizer.tokenize("Louka")[1].toString()).toBe("ou");
    expect(tokenizer.tokenize("Ouha")[0].toString()).toBe("ou");
    expect(tokenizer.tokenize("Ouha")[1].toString()).toBe("h");
    expect(tokenizer.tokenize("Chrpa")[0].toString()).toBe("ch");

    expect(tokenizer.tokenize("Zpěv")[0].toString()).toBe("s"); // spjef
    expect(tokenizer.tokenize("Zpěv")[2].toString()).toBe("j");
    expect(tokenizer.tokenize("Zpěv")[4].toString()).toBe("f");
    expect(tokenizer.tokenize("Zpěv")[4].toString()).toBe("f");

    expect(tokenizer.tokenize("Dvůr")[0].toString()).toBe("d");
    expect(tokenizer.tokenize("prosba")[3].toString()).toBe("z");
    expect(tokenizer.tokenize("sbor")[0].toString()).toBe("z");
    expect(tokenizer.tokenize("skrz")[3].toString()).toBe("s");
    expect(tokenizer.tokenize("vše")[0].toString()).toBe("f");
    expect(tokenizer.tokenize("zádech")[4].toString()).toBe("ch");
    expect(tokenizer.tokenize("obchod")[1].toString()).toBe("p");
    expect(tokenizer.tokenize("obchod")[4].toString()).toBe("t");

    expect(tokenizer.tokenize("chmel")[0].toString()).toBe("ch");
    expect(tokenizer.tokenize("chmel")[1].toString()).toBe("m");

    expect(tokenizer.tokenize("k domu")[0].toString()).toBe("g");
    expect(tokenizer.tokenize("z traktoru")[0].toString()).toBe("s");
    expect(tokenizer.tokenize("rozcupovat")[2].toString()).toBe("s");
    expect(tokenizer.tokenize("zčajován")[0].toString()).toBe("s");
    expect(tokenizer.tokenize("srub")[0].toString()).toBe("s");
    expect(tokenizer.tokenize("chvástat")[0].toString()).toBe("ch");
    expect(tokenizer.tokenize("kázeň")[4].toString()).toBe("ň");

    // TODO:
    // expect(tokenizer.tokenize("poučka")[2].toString()).toBe("u");
  });
});
