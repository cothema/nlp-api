import { AntonymsDetermination } from "./@workers/antonyms-determination/AntonymsDetermination";

const dotenv = require("dotenv");
dotenv.config();

// (new NounDeclensionDetermination()).browseAndDetermine();

(new AntonymsDetermination()).browseAndDetermine();
