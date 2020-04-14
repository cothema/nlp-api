import { CsLongSimpleVowelList } from "./CsLongSimpleVowelList";
import { CsShortVowelList } from "./CsShortVowelList";

export class CsVowelList {
  public static list: string[] = CsShortVowelList.list.concat(
    CsLongSimpleVowelList.list,
  );
}
