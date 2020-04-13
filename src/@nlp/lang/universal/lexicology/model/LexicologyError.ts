import { ModifiableToken } from "../../../../shared/model/ModifiableToken";
import { LexicologyErrorType } from "../enums/LexicologyErrorType";

export class LexicologyError {
  public tokenInfo?: ModifiableToken;
  public fixed?: boolean;
  public type?: LexicologyErrorType;

  public constructor(init?: Partial<LexicologyError>) {
    Object.assign(this, init);
  }
}
