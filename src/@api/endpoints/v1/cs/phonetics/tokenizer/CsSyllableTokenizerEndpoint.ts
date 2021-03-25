import { CsSyllableTokenizer } from "@cothema/nlp-lang-cs";
import { Express } from "express";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../../shared/endpoints/AbstractTokenizerEndpoint";

export class CsSyllableTokenizerEndpoint extends AbstractTokenizerEndpoint
  implements IEndpoint {
  constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/tokenizer/syllable",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected actionFactory = () => new CsSyllableTokenizer();
}
