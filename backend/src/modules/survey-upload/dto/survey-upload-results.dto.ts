import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { Status } from '@prisma/client';
import { SurveyDto } from './survey-result.dto';
import { Type } from 'class-transformer';

export class SurveyUploadResults {
  @IsNotEmpty()
  @IsEnum(Status)
  status: string;

  @IsNotEmpty()
  @MinLength(2)
  message: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  filepathResult: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SurveyDto)
  surveys: SurveyDto[];
}
