import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SurveyModule } from './modules/survey/survey.module';

@Module({
  imports: [SurveyModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
