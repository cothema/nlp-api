import { Express } from "express";
import { CsTextToIpaConverter } from "../../../../../../@nlp/lang/cs/phonetics/converters/CsTextToIpaConverter";
import { PhoneIpa } from "../../../../../../@nlp/lang/universal/orthography/model/PhoneIpa";
import { IStringable } from "../../../../../../@nlp/shared/interfaces/IStringable";
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
