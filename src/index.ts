import { HttpServer } from "./@api/http-server";

const dotenv = require('dotenv');
dotenv.config();

(new HttpServer()).init();
