import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Model } from 'src/models/models.entity';
import { Category } from 'src/categories/category.entity';
import { SubCategory } from 'src/sub-categories/sub_category.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Model, Category, SubCategory])],
  controllers: [BrandsController],
  providers: [BrandsService, CategoriesService, SubCategoriesService]
})
export class BrandsModule {}
