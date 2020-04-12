import { CsLongSimpleVowelList } from "./CsLongSimpleVowelList";
import { CsShortVowelList } from "./CsShortVowelList";

export class CsVowelList {
  static list: string[] = CsShortVowelList.list.concat(CsLongSimpleVowelList.list);
}
