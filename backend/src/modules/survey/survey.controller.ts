import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  async create(@Body() createSurveyDto: CreateSurveyDto) {
    return await this.surveyService.create(createSurveyDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('size') size: number = 8) {
    return this.surveyService.findAll(Number(page), Number(size));
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.surveyService.findOne(code);
  }

  @Put(':code')
  update(
    @Param('code') code: string,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ) {
    return this.surveyService.update(code, updateSurveyDto);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.surveyService.remove(code);
  }
}
