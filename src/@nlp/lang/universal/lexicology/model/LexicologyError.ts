import { ModifiableToken } from "../../../../shared/model/ModifiableToken";
import { LexicologyErrorType } from "../enums/LexicologyErrorType";

export class LexicologyError {
  tokenInfo?: ModifiableToken;
  fixed?: boolean;
  type?: LexicologyErrorType;

  constructor(init?: Partial<LexicologyError>) {
    Object.assign(this, init);
  }
}
