export class Word {
  tags: {
    type: string,
    tagType: string,
    probability: number,
  }[];

  constructor(public text: string) {
  }
}
