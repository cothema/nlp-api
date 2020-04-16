import { Express } from "express";
import { IEndpoint } from "../../../../shared/interfaces/IEndpoint";
import { AbstractEndpoint } from "../../AbstractEndpoint";
import { CharTokenizerEndpoint } from "./tokenizer/CharTokenizerEndpoint";
import { LetterTokenizerEndpoint } from "./tokenizer/LetterTokenizerEndpoint";

export class UniOrthographyEndpoint extends AbstractEndpoint
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
      new CharTokenizerEndpoint(this.app, this.getPath()),
      new LetterTokenizerEndpoint(this.app, this.getPath()),
    ];
  }
}
