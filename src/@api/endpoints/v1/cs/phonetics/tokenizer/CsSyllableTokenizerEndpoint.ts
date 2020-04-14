import { CsSyllableTokenizer } from "../../../../../../@nlp/lang/cs/phonetics/tokenizers/CsSyllableTokenizer";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../../shared/tokenizers/AbstractTokenizerEndpoint";

export class CsSyllableTokenizerEndpoint extends AbstractTokenizerEndpoint
  implements IEndpoint {
  public subPath = "/tokenizer/syllable";

  protected tokenizerFactory = () => new CsSyllableTokenizer();
}
