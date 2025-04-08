import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterconfigService } from 'src/shared/multer-config/multer-config.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { SurveyUploadController } from './survey-upload.controller';
import { SurveyUploadService } from './survey-upload.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterconfigService,
    }),
  ],
  controllers: [SurveyUploadController],
  providers: [PrismaService, SurveyUploadService],
})
export class SurveyUploadModule {}
