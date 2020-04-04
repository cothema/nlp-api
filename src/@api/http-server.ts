import express from "express";
import { Solver } from "../@nlp/solver";

export class HttpServer {

  private initialized = false;
  private port = 3001;

  constructor() {
  }

  init(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;

    const app = express();

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

    app.post("/analyze", async (req, res) => {
      console.log("Incoming request.");

      if (req.body && req.body["text"]) {
        const solution = await Solver.solve(req.body["text"].toString());

        return res.send(solution);
      }

      res.statusCode = 500;
      return res.send({
        error: "Internal error!"
      });
    });

    app.listen(this.port, () => {
      console.log(`REST API server is running on port ${this.port}...`);
    });
  }

}
