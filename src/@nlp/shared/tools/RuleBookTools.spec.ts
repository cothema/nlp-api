import { CsPhoneRules } from "../../lang/cs/phonetics/rules/CsPhoneRules";
import { CsSimplePhoneTokenizer } from "../../lang/cs/phonetics/tokenizers/CsSimplePhoneTokenizer";
import { CsSyllableTokenizer } from "../../lang/cs/phonetics/tokenizers/CsSyllableTokenizer";
import { Meta } from "../../lang/universal/orthography/model/Meta";
import { Voice } from "../../lang/universal/orthography/model/Voice";
import { RuleBookTools } from "./RuleBookTools";

describe("RuleBookTools", () => {
  test("applyRuleById", () => {
    const tokenizer = new CsSimplePhoneTokenizer();

    let out = RuleBookTools.applyRuleById(CsPhoneRules, tokenizer.tokenizeToMeta("hvozd"), 1, 3);

    expect(out.cluster).toBe(2);
  });
});
