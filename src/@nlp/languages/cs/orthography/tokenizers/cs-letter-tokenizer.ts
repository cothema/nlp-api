import { Digraph } from "../../../universal/orthography/model/digraph";
import { LetterTokenizer } from "../../../universal/orthography/tokenizers/letter-tokenizer";

/**
 * Includes only letters from alphabet (no spaces, special chars, punctuation etc.)
 */
export class CsLetterTokenizer extends LetterTokenizer {

  constructor() {
    super();
    this.digraphs = this.digraphs.concat(["ch"].map(x => new Digraph({ string: x })));
  }

}
