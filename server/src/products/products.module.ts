import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/category.entity';
import { SubCategory } from 'src/sub-categories/sub_category.entity';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { BrandsService } from 'src/brands/brands.service';
import { Brand } from 'src/brands/brand.entity';
import { ModelsService } from 'src/models/models.service';
import { Model } from 'src/models/models.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, SubCategory, Model, Brand]), AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesService, SubCategoriesService, ModelsService, BrandsService]
})
export class ProductsModule {}
