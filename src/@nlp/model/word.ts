export class Word {
  tags: {
    type: string,
    tagType: string,
    probability: number,
  }[];
  pronunciation: string;

  constructor(public text: string) {
  }
}
