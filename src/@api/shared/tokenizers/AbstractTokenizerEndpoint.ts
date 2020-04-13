import { Express } from "express";
import { IStringableTokenizer } from "../../../@nlp/shared/interfaces/IStringableTokenizer";
import { TokenizableStringableEntity } from "../../../@nlp/shared/model/TokenizableStringableEntity";
import { IEndpoint } from "../interfaces/IEndpoint";
import { AbstractEndpoint } from "../../endpoints/AbstractEndpoint";

export abstract class AbstractTokenizerEndpoint
  extends AbstractEndpoint
  implements IEndpoint {

  protected abstract tokenizerFactory: () => IStringableTokenizer<any>;

  constructor(
    app: Express,
    pathPrefix: string = '',
    subPath: string = "/tokenizer/letter",
  ) {
    super(app, pathPrefix, subPath);
    this.onTokenize();
  }

  protected onTokenize() {
    this.app.post(this.getPath("/tokenize"), async (req, res) => {
      if (req.body && req.body["str"]) {
        const solution = await this.tokenizerFactory().tokenize(
          new TokenizableStringableEntity({
            string: req.body["str"].toString(),
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
