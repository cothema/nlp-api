import { Express } from "express";
import { IEndpoint } from "../../../shared/interfaces/IEndpoint";
import { AbstractEndpoint } from "../AbstractEndpoint";
import { CsOrthographyEndpoint } from "./orthography/CsOrthographyEndpoint";
import { CsPhoneticsEndpoint } from "./phonetics/CsPhoneticsEndpoint";

export class CsEndpoint extends AbstractEndpoint implements IEndpoint {
  public constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/cs",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected appendSubEndpoints(): IEndpoint[] {
    return [
      new CsOrthographyEndpoint(this.app, this.getPath()),
      new CsPhoneticsEndpoint(this.app, this.getPath()),
    ];
  }
}
