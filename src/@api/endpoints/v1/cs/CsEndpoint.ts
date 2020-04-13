import { IEndpoint } from "../../../shared/interfaces/IEndpoint";
import { AbstractEndpoint } from "../AbstractEndpoint";
import { CsLetterTokenizerEndpoint } from "./orthography/tokenizer/CsLetterTokenizerEndpoint";
import { CsSimplePhoneTokenizerEndpoint } from "./phonetics/tokenizer/CsSimplePhoneTokenizerEndpoint";
import { CsSyllableTokenizerEndpoint } from "./phonetics/tokenizer/CsSyllableTokenizerEndpoint";

export class CsEndpoint extends AbstractEndpoint implements IEndpoint {
  public subPath = "/cs";

  protected appendSubEndpoints(): IEndpoint[] {
    return [
      new CsLetterTokenizerEndpoint(this.app, this.getPath()),
      new CsSimplePhoneTokenizerEndpoint(this.app, this.getPath()),
      new CsSyllableTokenizerEndpoint(this.app, this.getPath()),
    ];
  }
}
