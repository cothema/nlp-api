import { Express } from "express";
import { IEndpoint } from "../../../../shared/interfaces/IEndpoint";
import { AbstractEndpoint } from "../../AbstractEndpoint";
import { CsVerbalTypeClassifierEndpoint } from "../lexicology/classifiers/CsVerbalTypeClassifierEndpoint";

export class CsLexicologyEndpoint extends AbstractEndpoint
  implements IEndpoint {
  constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/lexicology",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected appendSubEndpoints(): IEndpoint[] {
    return [
      new CsVerbalTypeClassifierEndpoint(this.app, this.getPath()),
    ];
  }
}
