import { Express } from "express";
import supertest, { Response } from "supertest";

export class EndpointTestHelper {
  public static async postString<T>(
    app: Express,
    endpointPath: string,
    inputString: string,
  ): Promise<{
    data: {
      data?: T;
    };
    res: Response;
  }> {
    const response = await supertest(app)
      .post(endpointPath)
      .type("application/json")
      .set("Accept", "application/json")
      .send({ string: inputString });

    return {
      data: JSON.parse(response.text) as T,
      res: response,
    };
  }
}
