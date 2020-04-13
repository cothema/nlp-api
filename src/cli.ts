import { DictionaryImporter } from "./@workers/dictionary-importer/DictionaryImporter";

const dotenv = require('dotenv');
dotenv.config();

(new DictionaryImporter()).import();
