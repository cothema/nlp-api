import { IClassifier } from "@cothema/nlp-model";
import { Express } from "express";
import { IEndpoint } from "../interfaces/IEndpoint";
import { AbstractActionEndpoint } from "./AbstractActionEndpoint";

export abstract class AbstractClassifierEndpoint extends AbstractActionEndpoint
  implements IEndpoint {
  protected actionName = "classify";
  protected abstract actionFactory: () => IClassifier<any>;

  protected constructor(
    app: Express,
    pathPrefix: string = "",
    subPath?: string,
  ) {
    super(app, pathPrefix, subPath);
    this.onAction();
  }

  protected async handleRequest(req) {
    const solution = await this.actionFactory().classify(
      req.body,
    );

    return {
      data: solution,
    };
  }
}
