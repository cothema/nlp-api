import { Express } from "express";
import { CharTokenizer } from "../../../../../../@nlp/lang/universal/orthography/tokenizers/CharTokenizer";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../../shared/tokenizers/AbstractTokenizerEndpoint";

export class CharTokenizerEndpoint extends AbstractTokenizerEndpoint
  implements IEndpoint {
  public constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/tokenizer/char",
  ) {
    super(app, pathPrefix, subPath);
    this.onTokenize();
  }

  protected tokenizerFactory = () => new CharTokenizer();
}
