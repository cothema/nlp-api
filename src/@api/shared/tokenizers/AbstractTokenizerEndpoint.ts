import { Express } from "express";
import { IStringableTokenizer } from "../../../@nlp/shared/interfaces/IStringableTokenizer";
import { TokenizableStringableEntity } from "../../../@nlp/shared/model/TokenizableStringableEntity";
import { AbstractEndpoint } from "../../endpoints/v1/AbstractEndpoint";
import { IEndpoint } from "../interfaces/IEndpoint";

export abstract class AbstractTokenizerEndpoint extends AbstractEndpoint
  implements IEndpoint {
  protected abstract tokenizerFactory: () => IStringableTokenizer<any>;

  public constructor(app: Express, pathPrefix: string = "", subPath?: string) {
    super(app, pathPrefix, subPath);
    this.onTokenize();
  }

  protected onTokenize(): void {
    this.app.post(this.getPath("/tokenize"), async (req, res) => {
      if (req.body && req.body.str) {
        const solution = await this.tokenizerFactory().tokenize(
          new TokenizableStringableEntity({
            string: req.body.str.toString(),
          }),
        );

        return res.send(solution);
      }

      res.statusCode = 500;
      return res.send({
        error: "Internal error!",
      });
    });
  }
}
