import { Express } from "express";
import { CharTokenizer } from "../../../../../../@nlp/lang/universal/orthography/tokenizers/CharTokenizer";
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
