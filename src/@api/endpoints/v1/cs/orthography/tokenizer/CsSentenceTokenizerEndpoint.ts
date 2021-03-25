import { SentenceTokenizer } from "@cothema/nlp-lang";
import { Express } from "express";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../../shared/endpoints/AbstractTokenizerEndpoint";

export class CsSentenceTokenizerEndpoint extends AbstractTokenizerEndpoint
  implements IEndpoint {
  constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/tokenizer/sentence",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected actionFactory = () => new SentenceTokenizer();
}
