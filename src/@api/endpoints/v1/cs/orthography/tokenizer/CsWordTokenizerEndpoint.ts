import { Express } from "express";
import { WordTokenizer } from "../../../../../../@nlp/lang/universal/orthography/tokenizers/WordTokenizer";
import { AbstractTokenizerEndpoint } from "../../../../../shared/endpoints/AbstractTokenizerEndpoint";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";

export class CsWordTokenizerEndpoint extends AbstractTokenizerEndpoint
  implements IEndpoint {
  constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/tokenizer/word",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected actionFactory = () => new WordTokenizer();
}
