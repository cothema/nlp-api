import { Express } from "express";
import { IEndpoint } from "../../../../shared/interfaces/IEndpoint";
import { AbstractEndpoint } from "../../AbstractEndpoint";
import { CsLetterTokenizerEndpoint } from "./tokenizer/CsLetterTokenizerEndpoint";

export class CsOrthographyEndpoint extends AbstractEndpoint
  implements IEndpoint {
  constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/orthography",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected appendSubEndpoints(): IEndpoint[] {
    return [new CsLetterTokenizerEndpoint(this.app, this.getPath())];
  }
}
