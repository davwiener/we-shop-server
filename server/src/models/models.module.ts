import { Module } from '@nestjs/common';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './models.entity';
import { Brand } from 'src/brands/brand.entity';
import { BrandsService } from 'src/brands/brands.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/category.entity';
import { SubCategory } from 'src/sub-categories/sub_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Model, Brand, Category, Brand, SubCategory])],
  controllers: [ModelsController],
  providers: [ModelsService, BrandsService, SubCategoriesService, CategoriesService]
})
export class ModelsModule {}
