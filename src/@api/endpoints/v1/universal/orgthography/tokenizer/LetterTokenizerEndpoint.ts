import { LetterTokenizer } from "cothema-nlp-tools";
import { Express } from "express";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../../shared/endpoints/AbstractTokenizerEndpoint";

export class LetterTokenizerEndpoint extends AbstractTokenizerEndpoint
  implements IEndpoint {
  constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/tokenizer/letter",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected actionFactory = () => new LetterTokenizer();
}
