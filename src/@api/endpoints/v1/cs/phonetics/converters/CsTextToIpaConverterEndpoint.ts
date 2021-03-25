import { CsTextToIpaConverter } from "@cothema/nlp-lang-cs";
import { IStringable, PhoneIpa } from "@cothema/nlp-model";
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
