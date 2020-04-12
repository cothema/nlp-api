import { HttpServer } from "./@api/HttpServer";

const dotenv = require('dotenv');
dotenv.config();

(new HttpServer()).init();
