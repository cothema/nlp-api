import { DictionaryImporter } from "./@workers/dictionary-importer/DictionaryImporter";
import dotenv = require("dotenv");

dotenv.config();

new DictionaryImporter().import();
