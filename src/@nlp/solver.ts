import { SyntaxSolver } from "./languages/cs/syntaxSolver";
import { TagsDetermination } from "./languages/cs/tagsDetermination";
import { Text } from "./model/text";
import { Word } from "./model/word";
import { Tokenizer } from "./tokenizer";

export class Solver {

  static async solve(input: string): Promise<Text> {
    const text = new Text(input);

    text.sentences = Tokenizer.getSentences(text);
    text.words = Tokenizer.getWords(text);

    for (const word of text.words) {
      await Solver.solveWord(word);
    }

    for (const sentence of text.sentences) {
      sentence.words = Tokenizer.getWords(sentence);
      for (const word of sentence.words) {
        await Solver.solveWord(word);
      }
      SyntaxSolver.solve(sentence);
      sentence.sentenceType = Tokenizer.getSentenceType(sentence);
    }

    return text;
  }

  static async solveWord(word: Word) {
    return TagsDetermination.determine(word);
  }

}
