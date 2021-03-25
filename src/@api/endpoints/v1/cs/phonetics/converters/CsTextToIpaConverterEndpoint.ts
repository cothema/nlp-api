import { CsTextToIpaConverter, IStringable, PhoneIpa } from "cothema-nlp-tools";
import { Express } from "express";
import { AbstractConverterEndpoint } from "../../../../../shared/endpoints/AbstractConverterEndpoint";
import { IEndpoint } from "../../../../../shared/interfaces/IEndpoint";

export class CsTextToIpaConverterEndpoint extends AbstractConverterEndpoint<IStringable, PhoneIpa[]>
  implements IEndpoint {
  constructor(
    app: Express,
    pathPrefix: string = "",
    subPath: string = "/converter/text-to-ipa",
  ) {
    super(app, pathPrefix, subPath);
  }

  protected actionFactory = () => new CsTextToIpaConverter();
}
