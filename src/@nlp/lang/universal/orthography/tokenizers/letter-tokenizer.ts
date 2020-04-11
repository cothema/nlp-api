import { IStringable } from "../../../../shared/interfaces/i-stringable";
import { ITokenizer } from "../../../../shared/interfaces/i-tokenizer";
import { DigraphHelper } from "../helpers/digraph-helper";
import { Digraph } from "../model/digraph";
import { Letter } from "../model/letter";
import { LetterValidator } from "../validators/letter-validator";
import { CharTokenizer } from "./char-tokenizer";

/**
 * Includes only letters from alphabet (no spaces, special chars, punctuation etc.)
 */
export class LetterTokenizer implements ITokenizer<Letter> {
  validator = new LetterValidator();
  digraphs: Digraph[] = [];

  tokenize(input: IStringable): Array<Letter | Digraph> {
    const chars = new CharTokenizer().tokenize(input);
    const letters: Letter[] = [];

    for (let i = 0; chars[i]; i++) {
      // Check each char

      if (!this.validator.validate(chars[i])) {
        // Ignore invalid chars (spaces, special chars, punctuation etc.)
        continue;
      }

      let digraph = DigraphHelper.identifyDigraph(this.digraphs, chars, i);

      if (digraph) {
        // It is digraph
        i += digraph.toString().length - 1; // Skip digraph letters
        letters.push(digraph);
      } else {
        // Add single letter (already validated)
        letters.push(new Letter({ string: chars[i].toString() }));
      }
    }

    return letters;
  }
}
