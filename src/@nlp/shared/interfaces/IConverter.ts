export interface IConverter<I, O> {
  convert(input: I): O;
}
