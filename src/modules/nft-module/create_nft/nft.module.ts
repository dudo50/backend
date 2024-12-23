import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';
import { NftCreator } from './nft.service';
import { AppDbModule } from '@modules/app-db';
import { AuthModule } from '@modules/auth/auth.module';
import { AppConfigModule } from '@modules/config/config.module';

@Module({
  imports: [AppDbModule, AuthModule, AppConfigModule],
  controllers: [NftController],
  providers: [NftCreator],
})
export class NftModule { }