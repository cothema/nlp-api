
import { CsSimplePhoneTokenizer } from "@cothema/nlp-lang-cs";
import { Express } from "express";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";
import { AbstractTokenizerEndpoint } from "../../../../../shared/endpoints/AbstractTokenizerEndpoint";

export class CsSimplePhoneTokenizerEndpoint extends AbstractTokenizerEndpoint
  implements IEndpoint {
  constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/tokenizer/simple-phone",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected actionFactory = () => new CsSimplePhoneTokenizer();
}
