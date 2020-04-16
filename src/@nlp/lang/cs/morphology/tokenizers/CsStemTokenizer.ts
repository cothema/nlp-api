import { StemmerCs } from "@nlpjs/lang-cs";
import { IStringable } from "../../../../shared/interfaces/IStringable";
import { Token } from "../../../../shared/model/Token";
import { StringableTokenizer } from "../../../../shared/tokenizers/StringableTokenizer";
import { WordStem } from "../../../universal/orthography/model/WordStem";

export class CsStemTokenizer extends StringableTokenizer<WordStem> {
  tokenize(input: IStringable): Token<WordStem>[] {
    const out: Token<WordStem>[] = [];

    const stemmer = new StemmerCs();
    stemmer.stem([input]);

    out.push(
      new Token<WordStem>({
        origIndex: stemmer.cursor - stemmer.limit,
        origLength: stemmer.limit,
        fragment: new WordStem({
          string: stemmer.current,
        }),
      }),
    );

    return out;
  }
}
