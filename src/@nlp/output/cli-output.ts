import { SentenceModality } from "../lang/universal/semantics/enums/sentence-modality";
import { Sentence } from "../lang/universal/orthography/model/sentence";
import { Text } from "../lang/universal/orthography/model/text";

export class CliOutput {

  static echoAll(text: Text) {
    this.echoOverview(text);
    this.echoSentences(text);
  }

  static echoOverview(text: Text) {
    console.log("| Text:", text.string);
    console.log("Počet vět:", text.sentences.length);
    console.log("Počet slov:", text.words.length);
  }

  static echoSentences(text: Text) {
    for (const sentence of text.sentences) {
      console.log("-----");
      CliOutput.echoSentence(sentence);
    }
  }

  static echoSentence(sentence: Sentence) {
    console.log("| Věta:", sentence.string);

    console.log("Typ věty:", CliOutput.translateSentenceType(sentence.sentenceType));
    console.log("Počet slov:", sentence.words.length);
    console.log("Slova:", sentence.words.map(word => `${word.string} ${JSON.stringify(word.tags)}`));
  }

  static translateSentenceType(sentenceType: SentenceModality) {
    switch (sentenceType) {
      case SentenceModality.Statement:
        return "Oznamovací";
      case SentenceModality.Command:
        return "Rozkazovací";
      case SentenceModality.Wish:
        return "Přací";
      case SentenceModality.Question:
        return "Tázací";
    }
    return "(?) Neznámý";
  }

}
