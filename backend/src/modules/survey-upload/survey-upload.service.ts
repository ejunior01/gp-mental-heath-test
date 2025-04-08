import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResponseDto } from 'src/shared/dto/pagination-response-dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SurveyUpload } from '@prisma/client';

@Injectable()
export class SurveyUploadService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    page: number = 1,
    size: number = 8,
  ): Promise<PaginationResponseDto<SurveyUpload>> {
    const total = await this.prismaService.surveyUpload.count();

    const data = await this.prismaService.surveyUpload.findMany({
      skip: page - 1,
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
}
