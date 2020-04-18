import { Express } from "express";
import { IEndpoint } from "../../../shared/interfaces/IEndpoint";
import { AbstractEndpoint } from "../AbstractEndpoint";
import { CsLexicologyEndpoint } from "./lexicology/CsLexicologyEndpoint";
import { CsOrthographyEndpoint } from "./orthography/CsOrthographyEndpoint";
import { CsPhoneticsEndpoint } from "./phonetics/CsPhoneticsEndpoint";

export class CsEndpoint extends AbstractEndpoint implements IEndpoint {
  constructor(app: Express, pathPrefix: string = "", subPath: string = "/cs") {
    super(app, pathPrefix, subPath);
  }

  protected appendSubEndpoints(): IEndpoint[] {
    return [
      new CsLexicologyEndpoint(this.app, this.getPath()),
      new CsOrthographyEndpoint(this.app, this.getPath()),
      new CsPhoneticsEndpoint(this.app, this.getPath()),
    ];
  }
}
