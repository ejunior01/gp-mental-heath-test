import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

@Module({
  imports: [],
  controllers: [SurveyController],
  providers: [PrismaService, SurveyService],
})
export class SurveyModule {}
