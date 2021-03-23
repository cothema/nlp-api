import { Meta } from "../../lang/universal/orthography/model/Meta";
import { IStringable } from "./IStringable";

export interface IMetaTokenizer<Entity> {
  tokenizeToMeta(input: IStringable): Meta<Entity>;
}
