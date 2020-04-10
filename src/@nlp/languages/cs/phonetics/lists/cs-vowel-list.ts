import { CsLongSimpleVowelList } from "./cs-long-simple-vowel-list";
import { CsShortVowelList } from "./cs-short-vowel-list";

export class CsVowelList {
  static list: string[] = CsShortVowelList.list.concat(CsLongSimpleVowelList.list);
}
