import { Meta } from "../../lang/universal/orthography/model/Meta";
import { IRuleBook } from "../interfaces/IRuleBook";

export class RuleBookTools {

  static applyRuleById<T>(
    ruleBook: IRuleBook<T>,
    meta: Meta<T>,
    id: number,
    startAt: number = 0,
  ): { cluster: number, meta: Meta<T> } {
    let rule = ruleBook.rules.find(x => x.id === id);

    let out = rule.apply(meta, startAt);

    if (out.cluster > 0) {
      out.meta.rulesApplied.push(rule);
    }

    return { cluster: out.cluster, meta: out.meta };
  }

}
