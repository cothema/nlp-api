import { HttpServer } from "../../HttpServer";
import { EndpointTestHelper } from "../../shared/helpers/tests/EndpointTestHelper";
import { ComplexEndpoint } from "./ComplexEndpoint";

describe("ComplexEndpoint", () => {
  it("Test full path", async () => {
    const server = new HttpServer().setup();
    (() => new ComplexEndpoint(server.app))();

    const response = await EndpointTestHelper.postString(
      server.app,
      "/v1/cs/phonetics/tokenizer/syllable/tokenize",
      "slovo!",
    );

    expect(response.res.status).toEqual(200);
    expect(response.data.data[0].fragment.string).toEqual("slo");
  });
});
