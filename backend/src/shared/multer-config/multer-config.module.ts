import { Module } from '@nestjs/common';
import { MulterconfigService } from './multer-config.service';

@Module({
  imports: [],
  controllers: [],
  exports: [MulterconfigService],
})
export class MulterconfigModule {}
