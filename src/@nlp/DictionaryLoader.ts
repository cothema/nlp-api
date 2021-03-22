export class DictionaryLoader {
  private static cache: {
    lang: string;
    dictionaryName: string;
    content: string[];
  }[] = [];

  static async load(
    lang: string,
    dictionaryName: string,
    inLowerCase = false,
  ): Promise<string[]> {
    const fs = require("fs");

    lang = DictionaryLoader.secureDirName(lang);
    dictionaryName = DictionaryLoader.secureDirName(dictionaryName);

    const inCache = DictionaryLoader.cache.find(
      (el) => el.lang === lang && el.dictionaryName === dictionaryName,
    );
    if (inCache) {
      // Use cache to lighten server filesystem
      if (inLowerCase) {
        return inCache.content.map((el) => el.toLowerCase());
      }
      return inCache.content;
    } else {
      return new Promise<string[]>((resolve, reject) => {
        fs.readFile(
          "src/@nlp/lang/" + lang + "/dictionaries/" + dictionaryName + ".txt",
          "utf-8",
          (err, data) => {
            if (err) {
              console.error(err);
              reject();
            } else {
              let out = data.split("\n");
              DictionaryLoader.cache.push({
                lang,
                dictionaryName,
                content: out,
              });
              if (inLowerCase) {
                out = out.map((el) => el.toLowerCase());
              }
              out = out.filter((el) => el.length);
              resolve(out);
            }
          },
        );
      });
    }
  }

  private static secureDirName(dirName: string): string {
    dirName = dirName.replace(/\.\.\//g, "");
    dirName = dirName.replace(/\.\.\\/g, "");
    return dirName;
  }
}
