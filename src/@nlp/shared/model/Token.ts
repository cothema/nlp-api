export class Token<T = any, Orig = any> {
  /**
   * Index of fragment in origin
   */
  origIndex?: number;

  /**
   * Length of fragment in origin
   */
  origLength?: number;

  /**
   * Fragment entity from origin (e.g. word / char)
   * Can be customized and fragment string does not have to be equal to origin
   * string. (e.g. phone is not the same as char (origin))
   */
  fragment?: T;

  /**
   * Origin entity array (e.g. chars of long text / sentence)
   */
  orig?: Orig[];

  constructor(init?: Partial<Token<T, Orig>>) {
    Object.assign(this, init);
  }

  toString(): string {
    return this?.fragment.toString();
  }
}
