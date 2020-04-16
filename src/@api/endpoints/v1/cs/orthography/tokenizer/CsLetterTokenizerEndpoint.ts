import { Express } from "express";
import { CsLetterTokenizer } from "../../../../../../@nlp/lang/cs/orthography/tokenizers/CsLetterTokenizer";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../../shared/tokenizers/AbstractTokenizerEndpoint";

export class CsLetterTokenizerEndpoint extends AbstractTokenizerEndpoint
  implements IEndpoint {
  constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/tokenizer/letter",
  ) {
    super(app, pathPrefix, subPath);
    this.onTokenize();
  }

  protected tokenizerFactory = () => new CsLetterTokenizer();
}
