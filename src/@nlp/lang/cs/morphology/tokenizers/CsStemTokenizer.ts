import { StemmerCs } from "@nlpjs/lang-cs";
import { IStringable, StringableTokenizer, Token, WordStem } from "cothema-nlp-tools";

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
