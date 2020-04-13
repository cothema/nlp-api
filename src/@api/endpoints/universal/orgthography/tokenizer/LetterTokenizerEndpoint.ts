import { LetterTokenizer } from "../../../../../@nlp/lang/universal/orthography/tokenizers/LetterTokenizer";
import { IEndpoint } from "../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../shared/tokenizers/AbstractTokenizerEndpoint";

export class LetterTokenizerEndpoint
  extends AbstractTokenizerEndpoint
  implements IEndpoint {
  protected tokenizerFactory = () => new LetterTokenizer();
  subPath = "/tokenizer/letter";

}
