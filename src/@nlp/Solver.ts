// import { TagsDetermination } from "./lang/cs/TagsDetermination";
// import { Text } from "./lang/universal/orthography/model/Text";
// import { Word } from "./lang/universal/orthography/model/Word";
// import { TextTokenizer } from "./TextTokenizer";
//
// export class Solver {
//   public static async solveText(text: Text) {
//     text.sentences = TextTokenizer.getSentences(text);
//     text.words = TextTokenizer.getWords(text);
//
//     for (const word of text.words) {
//       await Solver.solveWord(word);
//     }
//
//     for (const sentence of text.sentences) {
//       // sentence.words = TextTokenizer.getWords(sentence);
//       // for (const word of sentence.words) {
//       //   await Solver.solveWord(word);
//       // }
//       // SyntaxSolver.solve(sentence);
//       // sentence.sentenceType = TextTokenizer.getSentenceType(sentence);
//     }
//
//     return text;
//   }
//
//   public static async solveWord(word: Word) {
//     await TagsDetermination.determine(word);
//     await Solver.solveWordIPAPronunciation(word);
//     return word;
//   }
//
//   private static solveWordIPAPronunciation(word: Word) {
//     let pronunciation = word.string.toLowerCase();
//
//     const dictionary = Solver.getIPAPronunciationPairs();
//     for (const key in dictionary) {
//       pronunciation = pronunciation.replace(key, dictionary[key]);
//     }
//
//     word.pronunciation = pronunciation;
//   }
//
//   private static getIPAPronunciationPairs() {
//     return {
//       ě: "je",
//       ň: "ɲ",
//       š: "ʃ",
//       ť: "c",
//       ď: "ɟ",
//       h: "ɦ",
//       ch: "x",
//       c: "t͡s",
//       č: "t͡ʃ",
//       ř: "r̝",
//       ž: "ʒ",
//       í: "iː",
//       ý: "iː",
//       ú: "uː",
//       ů: "uː",
//       é: "ɛː",
//       á: "aː",
//       ó: "oː",
//       i: "ɪ",
//       y: "ɪ",
//       u: "ʊ",
//     };
//   }
// }
