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
import { ApiQuery } from '@nestjs/swagger';
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
  @ApiQuery({ name: 'code', required: false, type: 'string' })
  @ApiQuery({ name: 'page', required: false, type: 'number', default: 1 })
  @ApiQuery({ name: 'size', required: false, type: 'number', default: 5 })
  findAll(
    @Query('code') code?: string,
    @Query('page') page: number = 1,
    @Query('size') size: number = 5,
  ) {
    return this.surveyService.findAll(code, Number(page), Number(size));
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
