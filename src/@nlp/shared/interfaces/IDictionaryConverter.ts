import { IConverter } from "./IConverter";
import { IDictionary } from "./IDictionary";

export interface IDictionaryConverter<I, O> extends IConverter<I, O> {
  dictionary: IDictionary<string | string[]>;
}
