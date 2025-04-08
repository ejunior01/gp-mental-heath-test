import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SurveyModule } from './modules/survey/survey.module';
import { SurveyUploadModule } from './modules/survey-upload/survey-upload.module';

@Module({
  imports: [
    SurveyModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SurveyUploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
