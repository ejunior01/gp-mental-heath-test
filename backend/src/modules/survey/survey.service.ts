import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateSurveyDto } from './dto/create-survey.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
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
    const resultNote = (createSurveyDto.noteOne + createSurveyDto.noteTwo) / 2;

    await this.prismaService.survey.create({
      data: {
        code: createSurveyDto.code,
        noteOne: createSurveyDto.noteOne,
        noteTwo: createSurveyDto.noteTwo,
        result: resultNote,
      },
    });

    return {
      message: 'Pesquisa registrada com sucesso',
    };
  }

  async uploadSurveyReport(file: Express.Multer.File) {
    await this.prismaService.surveyReport.create({
      data: {
        filepath: file.path,
      },
    });

    return { message: 'Arquivo carregado com sucesso', filePath: file.path };
  }

  async findAll() {
    return await this.prismaService.survey.findMany();
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

    const resultNote = (updateSurveyDto.noteOne + updateSurveyDto.noteTwo) / 2;

    const survey = await this.prismaService.survey.update({
      where: {
        code: code,
      },
      data: {
        code: updateSurveyDto.code,
        noteOne: updateSurveyDto.noteOne,
        noteTwo: updateSurveyDto.noteTwo,
        result: resultNote,
      },
      select: {
        code: true,
        noteOne: true,
        noteTwo: true,
        result: true,
      },
    });

    return updateSurveyDto;
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
