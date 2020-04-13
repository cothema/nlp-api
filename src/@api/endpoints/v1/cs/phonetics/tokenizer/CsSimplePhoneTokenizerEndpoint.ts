import { CsSimplePhoneTokenizer } from "../../../../../../@nlp/lang/cs/phonetics/tokenizers/CsSimplePhoneTokenizer";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../../shared/tokenizers/AbstractTokenizerEndpoint";

export class CsSimplePhoneTokenizerEndpoint extends AbstractTokenizerEndpoint
  implements IEndpoint {
  public subPath = "/tokenizer/simple-phone";

  protected tokenizerFactory = () => new CsSimplePhoneTokenizer();
}
