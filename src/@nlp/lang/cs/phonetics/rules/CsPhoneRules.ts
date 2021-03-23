import { IRule } from "../../../../shared/interfaces/IRule";
import { Meta } from "../../../universal/orthography/model/Meta";
import { Voice } from "../../../universal/orthography/model/Voice";
import { CsPairConsonantsDictionary } from "../dictionaries/CsPairConsonantsDictionary";
import { CsPhoneTools } from "./CsPhoneTools";

export class CsPhoneRules {
  static rules: IRule<Voice>[] = [
    {
      id: 1,
      title: "Spodoba znělosti: párové souhlásky - na konci",
      quotes: [
        {
          text: "V případě párových souhlásek probíhá spodoba znělosti ve spisovné češtině následujícím způsobem: na konci slova před pauzou (tj. pokud bezprostředně nevyslovíme další slovo) vyslovujeme vždy párovou souhlásku neznělou, respektive neznělá je celá koncová souhlásková skupina (koš [koš], lež [leš], hvozd [hvost]). Dvojice typu plod –⁠ plot tak od sebe pouze na základě výslovnosti bez kontextu nerozeznáme, protože oba výrazy znějí stejně [plot].",
          sourceText: "Internetová jazyková příručka [online] (2008–2021). Praha: Ústav pro jazyk český AV ČR, v. v. i. Cit. 23. 3. 2021. <https://prirucka.ujc.cas.cz/>.",
          link: "https://prirucka.ujc.cas.cz/?id=908",
        },
      ],
      apply: (meta: Meta<Voice>, startAt = 0) => {
        const dictionary = new CsPairConsonantsDictionary();

        let phoneTokens = meta.entity.phones;
        let cluster = 0;

        if (
          CsPhoneTools.isPairConsonant(phoneTokens[startAt]) &&
          (phoneTokens[startAt + 1] === undefined || CsPhoneTools.isPairConsonant(phoneTokens[startAt + 1])) &&
          (phoneTokens[startAt + 2] === undefined || CsPhoneTools.isPairConsonant(phoneTokens[startAt + 2])) &&
          phoneTokens[startAt + 3] === undefined
        ) {
          /**
           * [pair]([pair])([pair])[end] => [voiceless][voiceless];
           * e.g. le-ž (š), hvo-zd (st)
           */
          phoneTokens[startAt].fragment.string = dictionary.translateElement(
            phoneTokens[startAt].fragment.toString(),
          );

          if (phoneTokens[startAt + 1] !== undefined) {
            phoneTokens[startAt + 1].fragment.string = dictionary.translateElement(
              phoneTokens[startAt + 1].fragment.toString(),
            );
            cluster++; // skip next phone
          }

          if (phoneTokens[startAt + 2] !== undefined) {
            phoneTokens[startAt + 2].fragment.string = dictionary.translateElement(
              phoneTokens[startAt + 2].fragment.toString(),
            );
            cluster++; // skip next phone
          }
        }

        return { cluster: cluster, meta: meta };
      },
    },
  ];

  static applyRuleById(meta: Meta<Voice>, id: number, startAt: number = 0): { cluster: number, meta: Meta<Voice> } {
    let rule = CsPhoneRules.rules.find(x => x.id === id);

    let out = rule.apply(meta, startAt);

    out.meta.rulesApplied.push(rule);
    return { cluster: out.cluster, meta: out.meta };
  }
}
