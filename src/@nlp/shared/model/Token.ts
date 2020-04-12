export class Token<T> {
  index?: number;
  length?: number;
  entity?: T;

  constructor(init?: Partial<Token<T>>) {
    Object.assign(this, init);
  }
}
