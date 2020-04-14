import { Express } from "express";
import { IEndpoint } from "../../../shared/interfaces/IEndpoint";
import { AbstractEndpoint } from "../AbstractEndpoint";
import { UniOrthographyEndpoint } from "./orgthography/UniOrthographyEndpoint";

export class UniEndpoint extends AbstractEndpoint implements IEndpoint {
  public constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/universal",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected appendSubEndpoints(): IEndpoint[] {
    return [new UniOrthographyEndpoint(this.app, this.getPath())];
  }
}
