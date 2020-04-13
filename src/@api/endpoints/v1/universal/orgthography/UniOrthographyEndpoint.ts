import { IEndpoint } from "../../../../shared/interfaces/IEndpoint";
import { AbstractEndpoint } from "../../AbstractEndpoint";
import { CharTokenizerEndpoint } from "./tokenizer/CharTokenizerEndpoint";
import { LetterTokenizerEndpoint } from "./tokenizer/LetterTokenizerEndpoint";

export class UniOrthographyEndpoint extends AbstractEndpoint
  implements IEndpoint {
  public subPath = "/orthography";

  protected appendSubEndpoints(): IEndpoint[] {
    return [
      new CharTokenizerEndpoint(this.app, this.getPath()),
      new LetterTokenizerEndpoint(this.app, this.getPath()),
    ];
  }
}
