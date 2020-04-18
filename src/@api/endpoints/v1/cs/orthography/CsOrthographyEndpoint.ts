import { Express } from "express";
import { IEndpoint } from "../../../../shared/interfaces/IEndpoint";
import { AbstractEndpoint } from "../../AbstractEndpoint";
import { CsLetterTokenizerEndpoint } from "./tokenizer/CsLetterTokenizerEndpoint";
import { CsSentenceTokenizerEndpoint } from "./tokenizer/CsSentenceTokenizerEndpoint";
import { CsWordTokenizerEndpoint } from "./tokenizer/CsWordTokenizerEndpoint";

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
    return [
      new CsLetterTokenizerEndpoint(this.app, this.getPath()),
      new CsSentenceTokenizerEndpoint(this.app, this.getPath()),
      new CsWordTokenizerEndpoint(this.app, this.getPath()),
    ];
  }
}
