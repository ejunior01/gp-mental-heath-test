import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterconfigService } from 'src/shared/multerconfig/multerconfig.service';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterconfigService,
    }),
  ],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
