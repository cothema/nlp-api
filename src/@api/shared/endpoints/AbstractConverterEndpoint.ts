import { IConverter } from "@cothema/nlp-core";
import { Express } from "express";
import { IEndpoint } from "../interfaces/IEndpoint";
import { AbstractActionEndpoint } from "./AbstractActionEndpoint";

export abstract class AbstractConverterEndpoint<In, Out> extends AbstractActionEndpoint
  implements IEndpoint {
  protected abstract actionFactory: () => IConverter<In, Out>;
  protected actionName = "convert";

  protected constructor(
    app: Express,
    pathPrefix: string = "",
    subPath?: string,
  ) {
    super(app, pathPrefix, subPath);
    this.onAction();
  }

  protected async handleRequest(req) {
    const solution = await this.actionFactory().convert(req.body.string.toString());

    return {
      data: solution,
    };
  }
}
