import { Module } from '@nestjs/common';
import { AuctionsModule } from './auctions/auctions.module';

@Module({
  imports: [AuctionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
