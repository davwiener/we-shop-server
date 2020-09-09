import { Module } from '@nestjs/common';
import { AuctionsController } from './auctions.controller';
import { AuctionsService } from './auctions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './auction.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auction, Product]), AuthModule],
  controllers: [AuctionsController],
  providers: [AuctionsService]
})
export class AuctionsModule {}
