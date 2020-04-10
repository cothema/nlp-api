import { IConverter } from "./i-converter";
import { IDictionary } from "./i-dictionary";

export interface IDictionaryConverter<I, O> extends IConverter<I, O> {
  dictionary: IDictionary<string | string[]>;
}
