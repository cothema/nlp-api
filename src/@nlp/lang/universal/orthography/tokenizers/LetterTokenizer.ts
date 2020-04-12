import { IStringable } from "../../../../shared/interfaces/IStringable";
import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { Token } from "../../../../shared/model/Token";
import { StringableTokenizer } from "../../../../shared/tokenizers/StringableTokenizer";
import { DigraphHelper } from "../helpers/digraph-helper";
import { Digraph } from "../model/digraph";
import { Letter } from "../model/letter";
import { LetterValidator } from "../validators/letter-validator";
import { CharTokenizer } from "./CharTokenizer";

/**
 * Includes only letters from alphabet (no spaces, special chars, punctuation etc.)
 */
export class LetterTokenizer
  extends StringableTokenizer<Letter>
  implements IStringableTokenizer<Letter> {
  validator = new LetterValidator();
  digraphs: Digraph[] = [];

  tokenize(input: IStringable): Token<Letter | Digraph>[] {
    this.digraphs = [];
    const letterTokens: Token<Letter>[] = [];
    const charTokens = new CharTokenizer().tokenize(input);

    for (let i = 0, tokenIndex = 0; charTokens[i]; i++, tokenIndex++) {
      // Check each char

      if (!this.validator.validate(charTokens[i].entity)) {
        // Ignore invalid chars (spaces, special chars, punctuation etc.)
        continue;
      }

      let digraph = DigraphHelper.identifyDigraph(
        this.digraphs,
        charTokens.map(x => x.entity),
        i,
      );

      if (digraph) {
        // It is digraph
        i += digraph.toString().length - 1; // Skip digraph letters
        letterTokens.push(new Token<Letter>({
          index: tokenIndex,
          length: digraph.toString().length,
          entity: digraph,
        }));
        tokenIndex += digraph.toString().length - 1;
      } else {
        // Add single letter (already validated)
        letterTokens.push(new Token<Letter>({
          index: tokenIndex,
          length: 1,
          entity: new Letter({ string: charTokens[i].entity.toString() }),
        }));
      }
    }

    return letterTokens;
  }
}
