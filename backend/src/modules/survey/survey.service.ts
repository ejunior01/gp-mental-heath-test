import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Survey } from '@prisma/client';

import { CreateSurveyDto } from './dto/create-survey.dto';
import { PaginationResponseDto } from 'src/shared/dto/pagination-response-dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SurveyEntity } from './entities/survey-entity';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Injectable()
export class SurveyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSurveyDto: CreateSurveyDto) {
    const existSurvey = await this.prismaService.survey.findUnique({
      where: {
        code: createSurveyDto.code,
      },
      select: {
        code: true,
      },
    });

    if (existSurvey) {
      throw new ConflictException('Código de pesquisa já consta cadastrado');
    }

    const surveyEntity = new SurveyEntity(
      createSurveyDto.code,
      createSurveyDto.noteOne,
      createSurveyDto.noteTwo,
    );

    await this.prismaService.survey.create({
      data: {
        code: surveyEntity.code,
        noteOne: surveyEntity.noteOne,
        noteTwo: surveyEntity.noteTwo,
        result: surveyEntity.result,
      },
    });

    return {
      message: 'Pesquisa registrada com sucesso',
    };
  }

  async findAll(
    code?: string,
    page: number = 1,
    size: number = 5,
  ): Promise<PaginationResponseDto<Survey>> {
    const filtering: Prisma.SurveyWhereInput = {
      code: {
        contains: code,
        mode: 'insensitive',
      },
    };

    const total = await this.prismaService.survey.count({
      where: filtering,
    });

    const data = await this.prismaService.survey.findMany({
      where: filtering,
      skip: (page - 1) * size,
      take: size,
    });

    return new PaginationResponseDto<Survey>(page, size, total, data);
  }

  async findOne(code: string) {
    const existsSurvey = await this.prismaService.survey.findUnique({
      where: { code },
    });

    if (existsSurvey == null) {
      throw new NotFoundException('Código de pesquisa não localizado');
    }

    return existsSurvey;
  }

  async update(code: string, updateSurveyDto: UpdateSurveyDto) {
    const existSurvey = await this.prismaService.survey.findUnique({
      where: {
        code,
      },
    });

    if (existSurvey == null) {
      throw new NotFoundException('Código de pesquisa não localizado');
    }

    if (code !== updateSurveyDto.code) {
      const codeInUse = await this.prismaService.survey.findUnique({
        where: {
          code: updateSurveyDto.code,
        },
      });

      if (codeInUse) {
        throw new ConflictException('Código de pesquisa já consta cadastrado');
      }
    }

    const surveyEntity = new SurveyEntity(
      updateSurveyDto.code,
      updateSurveyDto.noteOne,
      updateSurveyDto.noteTwo,
    );

    const survey = await this.prismaService.survey.update({
      where: {
        code: code,
      },
      data: {
        code: surveyEntity.code,
        noteOne: surveyEntity.noteOne,
        noteTwo: surveyEntity.noteTwo,
        result: surveyEntity.result,
        updatedAt: surveyEntity.updatedAt,
      },
      select: {
        code: true,
        noteOne: true,
        noteTwo: true,
        result: true,
      },
    });

    return survey;
  }

  async remove(code: string) {
    const survey = await this.prismaService.survey.findUnique({
      where: {
        code,
      },
    });

    if (survey == null) {
      throw new NotFoundException('Código de pesquisa não localizado');
    }

    await this.prismaService.survey.delete({
      where: {
        code,
      },
    });

    return { message: 'Pesquisa removida com sucesso.' };
  }
}
