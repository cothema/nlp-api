import { HttpServer } from "../../../../HttpServer";
import { EndpointTestHelper } from "../../../../shared/helpers/tests/EndpointTestHelper";
import { CharTokenizerEndpoint } from "./CharTokenizerEndpoint";

describe("CharTokenizerEndpoint", () => {
  it("Tokenize", async () => {
    const server = new HttpServer().setup();
    const endpoint = new CharTokenizerEndpoint(server.app);

    const response = await EndpointTestHelper.postString(
      server.app,
      endpoint.getPath("/tokenize"),
      "Loong text",
    );

    expect(response.data[1].entity.string).toEqual("o");
    expect(response.data[6].entity.string).toEqual("t");
  });
});
