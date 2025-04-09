import { Injectable, NotFoundException } from '@nestjs/common';
import { Status, SurveyUpload } from '@prisma/client';

import { PaginationResponseDto } from 'src/shared/dto/pagination-response-dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SurveyUploadResults } from './dto/survey-upload-results.dto';

@Injectable()
export class SurveyUploadService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    page: number = 1,
    size: number = 8,
  ): Promise<PaginationResponseDto<SurveyUpload>> {
    const total = await this.prismaService.surveyUpload.count();

    const data = await this.prismaService.surveyUpload.findMany({
      skip: (page - 1) * size,
      take: size,
    });

    return new PaginationResponseDto<SurveyUpload>(page, size, total, data);
  }

  async findOne(id: number) {
    const existsSurveyUpload = await this.prismaService.surveyUpload.findUnique(
      {
        where: { id },
      },
    );

    if (existsSurveyUpload == null) {
      throw new NotFoundException(
        'Código de acompanhamento de upload de pesquisa não localizado',
      );
    }

    return existsSurveyUpload;
  }

  async surveyUploadReport(file: Express.Multer.File) {
    await this.prismaService.surveyUpload.create({
      data: {
        filepath: file.path,
      },
    });

    return { message: 'Arquivo carregado com sucesso', filePath: file.path };
  }

  async uploadFileResults(
    id: number,
    surveyUploadResults: SurveyUploadResults,
  ) {
    const existsSurveyUpload = await this.prismaService.surveyUpload.findUnique(
      {
        where: { id },
      },
    );

    if (existsSurveyUpload == null) {
      throw new NotFoundException('Id não localizado');
    }

    if (surveyUploadResults.status === Status.FAILURE) {
      await this.prismaService.surveyUpload.update({
        where: { id },
        data: {
          status: Status.FAILURE,
          message: surveyUploadResults.message,
          updatedAt: new Date(),
        },
      });

      return {
        id: id,
        message: `Registro do id: ${id} atualizado.`,
      };
    }
    const surveyResults = surveyUploadResults.surveys.map((e) => ({
      ...e,
      surveyUploadId: id,
    }));

    await this.prismaService.survey.createMany({
      data: surveyResults,
      skipDuplicates: true,
    });

    await this.prismaService.surveyUpload.update({
      where: { id },
      data: {
        filepathResult: surveyUploadResults.filepathResult,
        totalRecords: surveyUploadResults.surveys.length,
        status: Status.COMPLETED,
        message: surveyUploadResults.message,
        updatedAt: new Date(),
      },
    });

    return {
      id: id,
      totalRecords: surveyUploadResults.surveys.length,
      message: 'Pesquisas registradas com sucesso',
    };
  }
}
