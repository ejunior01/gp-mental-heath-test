import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';

import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';

@Injectable()
export class MulterconfigService implements MulterOptionsFactory {
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    };
  }
}
