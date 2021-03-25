import { StringableTokenizer } from "@cothema/nlp-core";
import { IStringable, Token, WordStem } from "@cothema/nlp-model";
import { StemmerCs } from "@nlpjs/lang-cs";

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
