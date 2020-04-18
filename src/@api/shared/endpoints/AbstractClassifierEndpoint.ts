import { Express } from "express";
import { IClassifier } from "../../../@nlp/shared/interfaces/IClassifier";
import { AbstractEndpoint } from "../../endpoints/v1/AbstractEndpoint";
import { IEndpoint } from "../interfaces/IEndpoint";

export abstract class AbstractClassifierEndpoint extends AbstractEndpoint
  implements IEndpoint {
  protected abstract classifierFactory: () => IClassifier<any>;

  protected constructor(
    app: Express,
    pathPrefix: string = "",
    subPath?: string,
  ) {
    super(app, pathPrefix, subPath);
    this.onClassify();
  }

  protected onClassify(): void {
    this.app.post(this.getPath("/classify"), async (req, res) => {
      if (req.body && req.body.string) {
        try {
          const solution = await this.classifierFactory().classify(
            req.body,
          );

          return res.send({
            data: solution,
          });
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
