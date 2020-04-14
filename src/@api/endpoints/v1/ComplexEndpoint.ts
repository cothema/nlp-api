import { IEndpoint } from "../../shared/interfaces/IEndpoint";
import { AbstractEndpoint } from "./AbstractEndpoint";
import { CsEndpoint } from "./cs/CsEndpoint";
import { UniEndpoint } from "./universal/UniEndpoint";

export class ComplexEndpoint extends AbstractEndpoint implements IEndpoint {
  public subPath = "/v1";

  protected appendSubEndpoints(): IEndpoint[] {
    return [
      new UniEndpoint(this.app, this.getPath()),
      new CsEndpoint(this.app, this.getPath()),
    ];
  }
}
