import { Module } from '@nestjs/common';
import { MulterconfigService } from './multerconfig.service';

@Module({
  imports: [],
  controllers: [],
  exports: [MulterconfigService],
})
export class MulterconfigModule {}
