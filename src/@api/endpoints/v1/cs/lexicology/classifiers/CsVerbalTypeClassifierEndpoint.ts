import { Express } from "express";
import { CsVerbalTypeClassifier } from "../../../../../../@nlp/lang/cs/lexicology/classifiers/CsVerbalTypeClassifier";
import { AbstractClassifierEndpoint } from "../../../../../shared/endpoints/AbstractClassifierEndpoint";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";

export class CsVerbalTypeClassifierEndpoint extends AbstractClassifierEndpoint
  implements IEndpoint {
  constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/classifier/verbal-type",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected actionFactory = () => new CsVerbalTypeClassifier();
}
