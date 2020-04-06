import { DictionaryImporter } from "./@workers/dictionary-importer/dictionary-importer";

const dotenv = require('dotenv');
dotenv.config();

(new DictionaryImporter()).import();
