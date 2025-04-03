import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyService } from './survey.service';

// Tamanho máximo de 500Mb para upload de arquivos
const MAX_SIZE_UPLOAD = 976 * 500000;

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  async create(@Body() createSurveyDto: CreateSurveyDto) {
    return await this.surveyService.create(createSurveyDto);
  }

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_SIZE_UPLOAD }),
          new FileTypeValidator({ fileType: 'text/csv' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.surveyService.uploadSurveyReport(file);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('size') size: number = 8) {
    return this.surveyService.findAll(Number(page), Number(size));
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
