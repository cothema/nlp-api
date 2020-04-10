import { IStringable } from "./i-stringable";

export interface ITokenizer<Output, Input = IStringable> {
  tokenize(input: Input): Output[];
}
