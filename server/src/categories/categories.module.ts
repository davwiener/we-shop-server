import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Product } from 'src/products/product.entity';
import { SubCategory } from 'src/sub-categories/sub_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, SubCategory])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
