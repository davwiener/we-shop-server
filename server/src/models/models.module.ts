import { Module } from '@nestjs/common';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './models.entity';
import { Brand } from 'src/brands/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Model, Brand])],
  controllers: [ModelsController],
  providers: [ModelsService]
})
export class ModelsModule {}
