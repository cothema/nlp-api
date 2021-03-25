import { IStringableTokenizer, TokenizableStringableEntity } from "cothema-nlp-tools";
import { Express } from "express";
import { IEndpoint } from "../interfaces/IEndpoint";
import { AbstractActionEndpoint } from "./AbstractActionEndpoint";

export abstract class AbstractTokenizerEndpoint extends AbstractActionEndpoint
  implements IEndpoint {
  protected actionName = "tokenize";
  protected abstract actionFactory: () => IStringableTokenizer<any>;

  protected constructor(
    app: Express,
    pathPrefix: string = "",
    subPath?: string,
  ) {
    super(app, pathPrefix, subPath);
    this.onAction();
  }

  protected async handleRequest(req) {
    const solution = await this.actionFactory().tokenize(
      new TokenizableStringableEntity({
        string: req.body.string.toString(),
      }),
    );

    return {
      data: solution.map((response) => {
        response.orig = undefined;
        return response;
      }),
    };
  }
}
