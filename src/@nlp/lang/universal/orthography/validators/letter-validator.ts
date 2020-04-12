import { IStringable } from "../../../../shared/interfaces/IStringable";
import { LetterList } from "../lists/letter-list";

export class LetterValidator {
  validate(letterCandidate: IStringable): boolean {
    return !!LetterList.list.find(x => x === letterCandidate.toString().toLowerCase());
  }
}
