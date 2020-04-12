import { ModifiableToken } from "../model/ModifiableToken";
import { IStringable } from "./IStringable";

export interface IStringableEditableToken extends IStringable {
  string?: string;
  stringOriginal?: string; // If not defined, than not modified.
  addToken(tokenInfo?: ModifiableToken): this;

  getTokens(): ModifiableToken[];
}
