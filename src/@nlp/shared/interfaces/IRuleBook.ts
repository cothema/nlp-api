import { IRule } from "./IRule";

export interface IRuleBook<T> {
  rules: IRule<T>[];
}
