import { Module } from '@nestjs/common';
import { AuctionsController } from './auctions.controller';
import { AuctionsService } from './auctions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './auction.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/products/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { Category } from 'src/categories/category.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Auction, Product, Category]), AuthModule],
  controllers: [AuctionsController],
  providers: [AuctionsService, ProductsService, CategoriesService]
})
export class AuctionsModule {}
