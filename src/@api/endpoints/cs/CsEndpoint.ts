import { IEndpoint } from "../../shared/interfaces/IEndpoint";
import { AbstractEndpoint } from "../AbstractEndpoint";
import { CsSimplePhoneTokenizerEndpoint } from "./phonetics/tokenizer/CsSimplePhoneTokenizerEndpoint";

export class CsEndpoint
  extends AbstractEndpoint
  implements IEndpoint {
  subPath = "/cs";

  protected appendSubEndpoints(): IEndpoint[] {
    return [
      new CsSimplePhoneTokenizerEndpoint(this.app, this.getPath()),
    ];
  }
}
