import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateSurveyDto {
  @IsNotEmpty()
  @MinLength(2)
  code: string;

  @IsNotEmpty()
  noteOne: number;

  @IsNotEmpty()
  noteTwo: number;
}
