import { HttpServer } from "./@api/HttpServer";
import dotenv = require("dotenv");

dotenv.config();

new HttpServer().init();
