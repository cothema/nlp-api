import { CsLetterTokenizer } from "../../../../../../@nlp/lang/cs/orthography/tokenizers/CsLetterTokenizer";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../../shared/tokenizers/AbstractTokenizerEndpoint";

export class CsLetterTokenizerEndpoint extends AbstractTokenizerEndpoint
  implements IEndpoint {
  public subPath = "/tokenizer/letter";

  protected tokenizerFactory = () => new CsLetterTokenizer();
}
