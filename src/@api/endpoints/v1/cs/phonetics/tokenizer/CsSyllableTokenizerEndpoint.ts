import { CsSyllableTokenizer } from "../../../../../../@nlp/lang/cs/phonetics/tokenizers/CsSyllableTokenizer";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../../shared/tokenizers/AbstractTokenizerEndpoint";

export class CsSyllableTokenizerEndpoint
  extends AbstractTokenizerEndpoint
  implements IEndpoint {
  protected tokenizerFactory = () => new CsSyllableTokenizer();
  subPath = "/tokenizer/syllable";

}
