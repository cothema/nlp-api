import { CsSimplePhoneTokenizer } from "./CsSimplePhoneTokenizer";

describe("CsSimplePhoneTokenizer", () => {
  test("Tokenize", () => {
    const tokenizer = new CsSimplePhoneTokenizer();

    expect(tokenizer.tokenizeToValues("Lukáš")[3]).toBe("á");
    expect(tokenizer.tokenizeToValues("Louka")[1]).toBe("ou");
    expect(tokenizer.tokenizeToValues("Ouha")[0]).toBe("ou");
    expect(tokenizer.tokenizeToValues("Ouha")[1]).toBe("h");
    expect(tokenizer.tokenizeToValues("Chrpa")[0]).toBe("ch");

    expect(tokenizer.tokenizeToValues("Zpěv")[0]).toBe("s"); // spjef
    expect(tokenizer.tokenizeToValues("Zpěv")[2]).toBe("j");
    expect(tokenizer.tokenizeToValues("Zpěv")[4]).toBe("f");
    expect(tokenizer.tokenizeToValues("Zpěv")[4]).toBe("f");

    expect(tokenizer.tokenizeToValues("Dvůr")[0]).toBe("d");
    expect(tokenizer.tokenizeToValues("prosba")[3]).toBe("z");
    expect(tokenizer.tokenizeToValues("sbor")[0]).toBe("z");
    expect(tokenizer.tokenizeToValues("skrz")[3]).toBe("s");
    expect(tokenizer.tokenizeToValues("vše")[0]).toBe("f");
    expect(tokenizer.tokenizeToValues("zádech")[4]).toBe("ch");
    expect(tokenizer.tokenizeToValues("obchod")[1]).toBe("p");
    expect(tokenizer.tokenizeToValues("obchod")[4]).toBe("t");

    expect(tokenizer.tokenizeToValues("chmel")[0]).toBe("ch");
    expect(tokenizer.tokenizeToValues("chmel")[1]).toBe("m");

    expect(tokenizer.tokenizeToValues("k domu")[0]).toBe("g");
    expect(tokenizer.tokenizeToValues("z traktoru")[0]).toBe("s");
    expect(tokenizer.tokenizeToValues("rozcupovat")[2]).toBe("s");
    expect(tokenizer.tokenizeToValues("zčajován")[0]).toBe("s");
    expect(tokenizer.tokenizeToValues("srub")[0]).toBe("s");
    expect(tokenizer.tokenizeToValues("chvástat")[0]).toBe("ch");
    expect(tokenizer.tokenizeToValues("kázeň")[4]).toBe("ň");

    expect(tokenizer.tokenizeToValues("výhoda")[1]).toBe("í");
    expect(tokenizer.tokenizeToValues("bytost")[1]).toBe("i");
    expect(tokenizer.tokenizeToValues("methyl")[2]).toBe("t");
    expect(tokenizer.tokenizeToValues("methyl")[3]).toBe("i");
    expect(tokenizer.tokenizeToValues("shrek")[0]).toBe("š");
    expect(tokenizer.tokenizeToValues("shrapnel")[0]).toBe("š");

    expect(tokenizer.tokenizeToOriginalValues("methyl")[2]).toBe("th");
    expect(tokenizer.tokenizeToValues(" ").length).toBe(0);
    expect(tokenizer.tokenize("v lese")[1].origIndex).toBe(2);

    // TODO:
    // expect(tokenizer.tokenize("poučka")[2]).toBe("u");
  });
});
