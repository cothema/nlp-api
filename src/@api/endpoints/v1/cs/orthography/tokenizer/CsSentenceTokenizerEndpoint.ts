import { Express } from "express";
import { SentenceTokenizer } from "../../../../../../@nlp/lang/universal/orthography/tokenizers/SentenceTokenizer";
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

  protected tokenizerFactory = () => new SentenceTokenizer();
}
