import { Express } from "express";
import { AbstractEndpoint } from "../../endpoints/v1/AbstractEndpoint";
import { IEndpoint } from "../interfaces/IEndpoint";

export abstract class AbstractActionEndpoint extends AbstractEndpoint
  implements IEndpoint {
  protected abstract actionFactory: () => any;
  protected abstract actionName: string;

  protected constructor(
    app: Express,
    pathPrefix: string = "",
    subPath?: string,
  ) {
    super(app, pathPrefix, subPath);
  }

  protected abstract handleRequest(req): any;

  protected onAction(): void {
    this.app.post(this.getPath("/" + this.actionName), async (req, res) => {
      if (req.body && req.body.string) {
        try {
          return res.send(await this.handleRequest(req));
        } catch (e) {
          console.error(e);
          res.statusCode = 500;
          return res.send({
            error: "Internal server error during the process!",
          });
        }
      }

      res.statusCode = 400;
      return res.send({
        error: "Bad request!",
      });
    });
  }
}
