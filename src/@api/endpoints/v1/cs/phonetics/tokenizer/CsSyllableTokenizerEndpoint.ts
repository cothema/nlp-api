import { Express } from "express";
import { CsSyllableTokenizer } from "../../../../../../@nlp/lang/cs/phonetics/tokenizers/CsSyllableTokenizer";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../../shared/tokenizers/AbstractTokenizerEndpoint";

export class CsSyllableTokenizerEndpoint extends AbstractTokenizerEndpoint
  implements IEndpoint {
  public constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/tokenizer/syllable",
  ) {
    super(app, pathPrefix, subPath);
    this.onTokenize();
  }

  protected tokenizerFactory = () => new CsSyllableTokenizer();
}
