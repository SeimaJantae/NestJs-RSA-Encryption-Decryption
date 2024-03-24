import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EncryptModule } from './encrypt/encrypt.module';
import { DecryptModule } from './decrypt/decrypt.module';

@Module({
  imports: [EncryptModule, DecryptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
