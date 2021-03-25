import { CsLetterTokenizer } from "cothema-nlp-tools";
import { Express } from "express";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../../shared/endpoints/AbstractTokenizerEndpoint";

export class CsLetterTokenizerEndpoint extends AbstractTokenizerEndpoint
  implements IEndpoint {
  constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/tokenizer/letter",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected actionFactory = () => new CsLetterTokenizer();
}
