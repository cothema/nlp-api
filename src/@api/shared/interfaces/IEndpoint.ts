import { Express } from "express";

export interface IEndpoint {
  app: Express;
  pathPrefix: string;
  subPath: string;

  getPath(): string;
}
