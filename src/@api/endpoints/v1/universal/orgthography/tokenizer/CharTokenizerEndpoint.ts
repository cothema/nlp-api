import { CharTokenizer } from "cothema-nlp-tools";
import { Express } from "express";
import { AbstractTokenizerEndpoint } from "../../../../../shared/endpoints/AbstractTokenizerEndpoint";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";

export class CharTokenizerEndpoint extends AbstractTokenizerEndpoint
  implements IEndpoint {
  constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/tokenizer/char",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected actionFactory = () => new CharTokenizer();
}
