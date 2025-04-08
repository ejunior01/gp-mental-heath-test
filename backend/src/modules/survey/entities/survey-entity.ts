export class SurveyEntity {
  code: string;
  noteOne: number;
  noteTwo: number;
  result: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(code: string, noteOne: number, noteTwo: number) {
    this.code = code;
    this.noteOne = noteOne;
    this.noteTwo = noteTwo;
    this.calculeResult();
  }

  private calculeResult() {
    this.result = (this.noteOne + this.noteTwo) / 2;
    this.updatedAt = new Date();
  }
}
