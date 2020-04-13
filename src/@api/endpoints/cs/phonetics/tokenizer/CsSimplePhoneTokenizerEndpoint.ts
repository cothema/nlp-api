import { CharTokenizer } from "../../../../../@nlp/lang/universal/orthography/tokenizers/CharTokenizer";
import { IEndpoint } from "../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../shared/tokenizers/AbstractTokenizerEndpoint";

export class CsSimplePhoneTokenizerEndpoint
  extends AbstractTokenizerEndpoint
  implements IEndpoint {
  protected tokenizerFactory = () => new CharTokenizer();
  subPath = "/tokenizer/char";

}
