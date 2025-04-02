import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SurveyModule } from './modules/survey/survey.module';
import { PrismaService } from './shared/prisma/prisma.service';

@Module({
  imports: [SurveyModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
