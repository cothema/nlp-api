import { Token } from "../../../../shared/model/Token";
import { Phone } from "../../../universal/orthography/model/Phone";
import { CsPairConsonantList } from "../lists/CsPairConsonantList";
import { CsVoicedConsonantList } from "../lists/CsVoicedConsonantList";
import { CsVoicelessConsonantList } from "../lists/CsVoicelessConsonantList";

export class CsPhoneTools {

  static isPairConsonant(phoneToken: Token<Phone>) {
    return CsPairConsonantList.list.includes(phoneToken.fragment.toString());
  }

  static isVoicedConsonant(phoneToken: Token<Phone>) {
    return CsVoicedConsonantList.list.includes(phoneToken.fragment.toString());
  }

  static isVoicelessConsonant(phoneToken: Token<Phone>) {
    return CsVoicelessConsonantList.list.includes(
      phoneToken.fragment.toString(),
    );
  }

}
