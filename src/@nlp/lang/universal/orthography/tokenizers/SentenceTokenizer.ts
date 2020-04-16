import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { RegExpTokenizer } from "../../../../shared/tokenizers/RegExpTokenizer";
import { Sentence } from "../model/Sentence";
import { SentenceValidator } from "../validators/SentenceValidator";

export class SentenceTokenizer extends RegExpTokenizer<Sentence>
  implements IStringableTokenizer<Sentence> {
  validator = new SentenceValidator();
  entityFactory = (a) => new Sentence(a);
}
