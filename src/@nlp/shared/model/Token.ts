export class Token<T = any, O = any> {
  /**
   * Index of fragment in origin
   */
  public origIndex?: number;

  /**
   * Length of fragment in origin
   */
  public origLength?: number;

  /**
   * Fragment entity from origin (e.g. word / char)
   * Can be customized and fragment string does not have to be equal to origin
   * string. (e.g. phone is not the same as char (origin))
   */
  public fragment?: T;

  /**
   * Origin entity array (e.g. chars of long text / sentence)
   */
  public orig?: O[];

  public constructor(init?: Partial<Token<T, O>>) {
    Object.assign(this, init);
  }

  public toString(): string {
    return this?.fragment.toString();
  }
}
