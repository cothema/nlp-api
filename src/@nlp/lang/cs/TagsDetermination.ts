import { DictionaryLoader } from "../../DictionaryLoader";
import { Word } from "../universal/orthography/model/Word";

export class TagsDetermination {
  public static async determine(word: Word) {
    const lang = "cs";

    word.tags = [];
    await TagsDetermination.determineVerbalTypes(word, lang);
    await TagsDetermination.determineEnumWords(word, lang);
    await TagsDetermination.determineOther(word, lang);
  }

  public static async matchWordInDictionary(
    language: string,
    dictionary: string,
    word: string,
  ): Promise<boolean> {
    const dictionaryItems = await DictionaryLoader.load(
      language,
      dictionary,
      true,
    );
    return dictionaryItems.includes(word.toLowerCase());
  }

  private static async determineVerbalTypes(word: Word, lang: string) {
    const dictionaries = [
      "verbal-types/adjectives",
      "verbal-types/adverbs",
      "verbal-types/conjunctions",
      "verbal-types/nouns",
      "verbal-types/prepositions",
      "verbal-types/pronouns",
      "verbal-types/verbs",
    ];

    for (const dictionary of dictionaries) {
      if (
        await TagsDetermination.matchWordInDictionary(
          lang,
          dictionary,
          word.string,
        )
      ) {
        word.tags.push({
          tagType: "verbal-types",
          type: dictionary.replace("verbal-types/", ""),
          probability: 0.9,
        });
      }
    }

    if (
      parseInt(word.string, 10) &&
      parseInt(word.string, 10).toString() === word.string
    ) {
      word.tags.push({
        tagType: "verbal-types",
        type: "number:numeric",
        probability: 1,
      });
    }
  }

  private static async determineEnumWords(word: Word, lang: string) {
    const dictionaries = ["enum-words/enum-words-b"];

    for (const dictionary of dictionaries) {
      if (
        await TagsDetermination.matchWordInDictionary(
          lang,
          dictionary,
          word.string,
        )
      ) {
        word.tags.push({
          tagType: "enum-words",
          type: dictionary.replace("enum-words/", ""),
          probability: 1.0,
        });
      }
    }
  }

  private static async determineOther(word: Word, lang: string) {
    const dictionaries = ["other/human-names"];

    for (const dictionary of dictionaries) {
      if (
        await TagsDetermination.matchWordInDictionary(
          lang,
          dictionary,
          word.string,
        )
      ) {
        word.tags.push({
          tagType: "other",
          type: dictionary.replace("other/", ""),
          probability: 1.0,
        });
      }
    }
  }
}
