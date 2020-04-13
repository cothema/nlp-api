import { EndpointTestHelper } from "../../../../../shared/helpers/tests/EndpointTestHelper";
import { HttpServer } from "../../../../../HttpServer";
import { LetterTokenizerEndpoint } from "./LetterTokenizerEndpoint";

describe("LetterTokenizerEndpoint", () => {
  it("Tokenize", async () => {
    const server = new HttpServer().setup();
    const endpoint = new LetterTokenizerEndpoint(server.app);

    const response = await EndpointTestHelper.postString(
      server.app,
      endpoint.getPath("/tokenize"),
      "I 💖 you!",
    );

    expect(response.data[0].entity.string).toEqual("I");
    expect(response.data[1].entity.string).toEqual("y");
  });
});