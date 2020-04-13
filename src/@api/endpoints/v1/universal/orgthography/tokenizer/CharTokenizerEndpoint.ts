import { CharTokenizer } from "../../../../../../@nlp/lang/universal/orthography/tokenizers/CharTokenizer";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../../shared/tokenizers/AbstractTokenizerEndpoint";

export class CharTokenizerEndpoint extends AbstractTokenizerEndpoint
  implements IEndpoint {
  public subPath = "/tokenizer/char";

  protected tokenizerFactory = () => new CharTokenizer();
}
