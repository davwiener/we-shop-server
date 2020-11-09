import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Model } from 'src/models/models.entity';
import { Category } from 'src/categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Model, Category])],
  controllers: [BrandsController],
  providers: [BrandsService]
})
export class BrandsModule {}
