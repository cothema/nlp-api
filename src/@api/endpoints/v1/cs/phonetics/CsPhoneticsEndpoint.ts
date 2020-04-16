import { Express } from "express";
import { IEndpoint } from "../../../../shared/interfaces/IEndpoint";
import { AbstractEndpoint } from "../../AbstractEndpoint";
import { CsSimplePhoneTokenizerEndpoint } from "./tokenizer/CsSimplePhoneTokenizerEndpoint";
import { CsSyllableTokenizerEndpoint } from "./tokenizer/CsSyllableTokenizerEndpoint";

export class CsPhoneticsEndpoint extends AbstractEndpoint implements IEndpoint {
  constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/phonetics",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected appendSubEndpoints(): IEndpoint[] {
    return [
      new CsSimplePhoneTokenizerEndpoint(this.app, this.getPath()),
      new CsSyllableTokenizerEndpoint(this.app, this.getPath()),
    ];
  }
}
