import { Module } from '@nestjs/common';
import { AuctionsController } from './auctions.controller';
import { AuctionsService } from './auctions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './auction.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';
import { Category } from 'src/categories/category.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { SubCategory } from 'src/sub-categories/sub_category.entity';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { Model } from 'src/models/models.entity';
import { ModelsService } from 'src/models/models.service';
import { Brand } from 'src/brands/brand.entity';
import { BrandsService } from 'src/brands/brands.service';

@Module({
  imports: [TypeOrmModule.forFeature([Auction, Product, Category, SubCategory, Model, Brand]), AuthModule],
  controllers: [AuctionsController],
  providers: [AuctionsService, ProductsService, CategoriesService, SubCategoriesService, ModelsService, BrandsService]
})
export class AuctionsModule {}
