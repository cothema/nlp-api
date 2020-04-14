import { Char } from "../model/Char";
import { Digraph } from "../model/Digraph";

export class DigraphHelper {
  public static identifyDigraph(
    digraphs: Digraph[],
    chars: Char[],
    i: number,
  ): Digraph | undefined {
    let digraphStr: string;

    for (const digraph of digraphs) {
      // Check each alphabet digraph

      if (DigraphHelper.compareStringableWithDigraph(chars, i, digraph)) {
        digraphStr = "";
        for (let j = 0; j < digraph.toString().length; j++) {
          digraphStr = digraphStr.concat(chars[i + j].toString());
        }
        return new Digraph({ string: digraphStr });
      }
    }

    return undefined;
  }

  public static compareStringableWithDigraph(
    chars: Char[],
    i: number,
    digraph: Digraph,
  ): boolean {
    for (let j = 0; digraph.toString()[j] && chars[i + j]; j++) {
      // Check each char in concrete digraph
      if (digraph.toString()[j] !== chars[i + j].toString().toLowerCase()) {
        return false;
      }
      if (j === digraph.toString().length - 1) {
        return true;
      }
    }

    return false;
  }
}
