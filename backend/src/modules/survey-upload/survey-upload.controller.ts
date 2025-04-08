import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { SurveyUploadService } from './survey-upload.service';

// Tamanho máximo de 500Mb para upload de arquivos
const MAX_SIZE_UPLOAD = 976 * 500000;

@Controller('survey-upload')
export class SurveyUploadController {
  constructor(private readonly surveyUploadService: SurveyUploadService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: 'number', default: 1 })
  @ApiQuery({ name: 'size', required: false, type: 'number', default: 8 })
  findAll(@Query('page') page: number = 1, @Query('size') size: number = 8) {
    return this.surveyUploadService.findAll(Number(page), Number(size));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveyUploadService.findOne(+id);
  }

  @Post()
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
    return this.surveyUploadService.surveyUploadReport(file);
  }
}
