import express, { Express } from "express";
import { Text } from "../@nlp/model/text";
import { Word } from "../@nlp/model/word";
import { Solver } from "../@nlp/solver";

export class HttpServer {

  private initialized = false;
  private defaultPort = 3001;
  private app: Express;

  constructor() {
  }

  init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;

    const app = this.app = express();

    app.use(express.json());
    app.use((req, res, next) => {
      // Website you wish to allow to connect
      res.setHeader("Access-Control-Allow-Origin", "*");

      // Request methods you wish to allow
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

      // Request headers you wish to allow
      res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader("Access-Control-Allow-Credentials", "true");

      // Pass to next layer of middleware
      next();
    });

    this.setEndpoints();

    this.listen();
  }

  private setEndpoints() {
    this.app.post("/analyze", async (req, res) => {
      if (req.body && req.body["text"]) {
        const solution = await Solver.solveText(
          new Text(req.body["text"].toString())
        );

        return res.send(solution);
      }

      res.statusCode = 500;
      return res.send({
        error: "Internal error!",
      });
    });

    this.app.post("/analyze/word", async (req, res) => {
      if (req.body && req.body["word"]) {
        const solution = await Solver.solveWord(
          new Word(req.body["word"].toString())
        );

        return res.send(solution);
      }

      res.statusCode = 500;
      return res.send({
        error: "Internal error!",
      });
    });
  }

  private listen() {
    const port = process.env.PORT || this.defaultPort;
    this.app.listen(port, () => {
      console.log(`REST API server is running on port ${this.defaultPort}...`);
    });
  }
}
