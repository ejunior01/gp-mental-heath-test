import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { SurveyUploadService } from './survey-upload.service';

// Tamanho máximo de 500Mb para upload de arquivos
const MAX_SIZE_UPLOAD = 976 * 500000;

@Controller('survey-upload')
export class SurveyUploadController {
  constructor(private readonly surveyUploadService: SurveyUploadService) {}

  @Get()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        page: {
          type: 'number',
          format: 'number',
        },
        size: {
          type: 'number',
          format: 'number',
        },
      },
    },
  })
  findAll() {
    return this.surveyUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveyUploadService.findOne(+id);
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
    return this.surveyUploadService.surveyUploadReport(file);
  }
}
