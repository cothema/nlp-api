import { HttpServer } from "../../../../../HttpServer";
import { EndpointTestHelper } from "../../../../../shared/helpers/tests/EndpointTestHelper";
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

    expect(response.res.status).toEqual(200);
    expect(response.data.data[1].fragment.string).toEqual("o");
    expect(response.data.data[6].fragment.string).toEqual("t");
  });
});
