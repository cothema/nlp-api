import { Sentence } from "../lang/universal/orthography/model/Sentence";
import { Text } from "../lang/universal/orthography/model/Text";
import { SentenceModality } from "../lang/universal/semantics/enums/SentenceModality";

export class CliOutput {
  public static echoAll(text: Text) {
    this.echoOverview(text);
    this.echoSentences(text);
  }

  public static echoOverview(text: Text) {
    console.log("| Text:", text.string);
    console.log("Počet vět:", text.sentences.length);
    console.log("Počet slov:", text.words.length);
  }

  public static echoSentences(text: Text) {
    for (const sentence of text.sentences) {
      console.log("-----");
      CliOutput.echoSentence(sentence);
    }
  }

  public static echoSentence(sentence: Sentence) {
    console.log("| Věta:", sentence.string);

    console.log(
      "Typ věty:",
      CliOutput.translateSentenceType(sentence.sentenceType),
    );
    console.log("Počet slov:", sentence.words.length);
    console.log(
      "Slova:",
      sentence.words.map(
        (word) => `${word.string} ${JSON.stringify(word.tags)}`,
      ),
    );
  }

  public static translateSentenceType(sentenceType: SentenceModality) {
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
