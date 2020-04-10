import { SentenceType } from "./enums/sentence-types";
import { Sentence } from "./languages/universal/orthography/model/sentence";
import { Text } from "./languages/universal/orthography/model/text";
import { Word } from "./languages/universal/orthography/model/word";

export class Tokenizer {
  static readonly interpunction = [".", ",", "?", "!", ":"];

  static getWords(input: Text | Sentence) {
    const text = Tokenizer.removeInterpunction(input.text);
    return text.split(" ")
      .filter(el => el.trim().length)
      .map(el => new Word(el));
  }

  static removeInterpunction(input: string) {
    for (const interpunctionElement of Tokenizer.interpunction) {
      input = input.replace(interpunctionElement, "");
    }

    return input;
  }

  static getSentences(text: Text) {
    const parts = text.string.split(/(\.|\?|\!)/g);

    const out = [];
    for (let i = 0; parts[i] !== undefined; i = i + 2) {
      if (parts[i + 1] === undefined) {
        parts[i + 1] = "";
      }
      out.push(parts[i] + parts[i + 1]);
    }

    return out.filter(el => {
      return el.length;
    }).map(el => {
      return new Sentence(el);
    });
  }

  static getSentenceType(sentence: Sentence): SentenceType | null {
    const end = sentence.string.substr(sentence.string.length - 1);
    switch (end) {
      case ".":
        return SentenceType.SAYING;
      case "?":
        return SentenceType.QUESTION;
      case "!":
        return SentenceType.COMMAND;
    }
    return null;
  }
}
