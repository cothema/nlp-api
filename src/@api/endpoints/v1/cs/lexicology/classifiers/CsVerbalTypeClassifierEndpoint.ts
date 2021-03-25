import { CsVerbalTypeClassifier } from "cothema-nlp-tools";
import { Express } from "express";
import { CsWordsRepository } from "../../../../../../@db/repository/lang/cs/CsWordsRepository";
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

  protected actionFactory = () => new CsVerbalTypeClassifier(new CsWordsRepository());
}
