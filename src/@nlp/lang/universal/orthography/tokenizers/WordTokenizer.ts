import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { SplitRegExpTokenizer } from "../../../../shared/tokenizers/SplitRegExpTokenizer";
import { Word } from "../model/Word";

export class WordTokenizer extends SplitRegExpTokenizer<Word>
  implements IStringableTokenizer<Word> {
  public splitRegExp = /[\s\?!"'<>,\.…]+/g;
}
