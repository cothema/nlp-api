import { IEndpoint } from "../../../shared/interfaces/IEndpoint";
import { AbstractEndpoint } from "../AbstractEndpoint";
import { UniOrthographyEndpoint } from "./orgthography/UniOrthographyEndpoint";

export class UniEndpoint extends AbstractEndpoint implements IEndpoint {
  public subPath = "/universal";

  protected appendSubEndpoints(): IEndpoint[] {
    return [new UniOrthographyEndpoint(this.app, this.getPath())];
  }
}
