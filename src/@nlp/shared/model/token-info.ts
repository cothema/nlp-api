export class TokenInfo {
  originalIndex?: number;
  originalLength?: number;

  constructor(init?: Partial<TokenInfo>) {
    Object.assign(this, init);
  }
}
