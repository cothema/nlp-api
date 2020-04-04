import "reflect-metadata";
import * as winston from "winston";

// Important for Jest compatibility with Inversify.js is import "reflect-metadata";
// Disable logger while running tests
winston.remove(winston.transports.Console);
winston.remove(winston.transports.File);
