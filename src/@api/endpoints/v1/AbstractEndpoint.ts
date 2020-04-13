import { Express } from "express";
import { IEndpoint } from "../../shared/interfaces/IEndpoint";

export abstract class AbstractEndpoint
  implements IEndpoint {
  subPath = "";

  constructor(
    public app: Express,
    public pathPrefix: string = "",
    subPath?: string,
  ) {
    if (subPath) {
      this.subPath = subPath;
    }
    this.appendSubEndpoints();
  }

  protected appendSubEndpoints(): IEndpoint[] {
    return [];
  }

  public getPath(endpointSubPath: string = ""): string {
    return this.pathPrefix + this.subPath + endpointSubPath;
  }
}
