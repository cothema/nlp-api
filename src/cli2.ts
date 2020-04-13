import { AntonymsDetermination } from "./@workers/antonyms-determination/AntonymsDetermination";
import dotenv = require("dotenv");

dotenv.config();

// (new NounDeclensionDetermination()).browseAndDetermine();

new AntonymsDetermination().browseAndDetermine();
