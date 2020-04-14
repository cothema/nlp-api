import { Express } from "express";
import { IEndpoint } from "../../shared/interfaces/IEndpoint";
import { AbstractEndpoint } from "./AbstractEndpoint";
import { CsEndpoint } from "./cs/CsEndpoint";
import { UniEndpoint } from "./universal/UniEndpoint";

export class ComplexEndpoint extends AbstractEndpoint implements IEndpoint {
  public constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/v1",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected appendSubEndpoints(): IEndpoint[] {
    return [
      new UniEndpoint(this.app, this.getPath()),
      new CsEndpoint(this.app, this.getPath()),
    ];
  }
}
