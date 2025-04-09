import { IsNotEmpty, IsNumber } from 'class-validator';

export class SurveyDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  noteOne: number;

  @IsNotEmpty()
  @IsNumber()
  noteTwo: number;

  @IsNotEmpty()
  @IsNumber()
  result: number;
}
