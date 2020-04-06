import { SyntaxSolver } from "./languages/cs/syntaxSolver";
import { TagsDetermination } from "./languages/cs/tagsDetermination";
import { Text } from "./model/text";
import { Word } from "./model/word";
import { Tokenizer } from "./tokenizer";

export class Solver {

  static async solveText(text: Text) {
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
    await TagsDetermination.determine(word);
    await Solver.solveWordIPAPronunciation(word);
    return word;
  }

  private static solveWordIPAPronunciation(word: Word) {
    let pronunciation = word.text.toLowerCase();

    const dictionary = Solver.getIPAPronunciationPairs();
    for (let key in dictionary) {
      pronunciation = pronunciation.replace(key, dictionary[key]);
    }

    word.pronunciation = pronunciation;
  }

  private static getIPAPronunciationPairs() {
    return {
      "ě": "je",
      "ň": "ɲ",
      "š": "ʃ",
      "ť": "c",
      "ď": "ɟ",
      "h": "ɦ",
      "ch": "x",
      "c": "t͡s",
      "č": "t͡ʃ",
      "ř": "r̝",
      "ž": "ʒ",
      "í": "iː",
      "ý": "iː",
      "ú": "uː",
      "ů": "uː",
      "é": "ɛː",
      "á": "aː",
      "ó": "oː",
      "i": "ɪ",
      "y": "ɪ",
      "u": "ʊ",
    };
  }

}
