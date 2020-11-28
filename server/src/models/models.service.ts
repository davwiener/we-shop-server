import { Injectable } from '@nestjs/common';
import { Model } from './models.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateModelDto } from './dto/create-model.dto';
import { Brand } from 'src/brands/brand.entity';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private modelsRepository: Repository<Model>,
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>
  ) {}

  fetchModels = async (): Promise<Model[]> => {
    return await this.modelsRepository.find({ select: ['id', 'name'], order: { name: 'ASC' } })
  }

  createModel = async ({ name, brandId }: CreateModelDto): Promise<Model> => {
    const brand = await this.brandsRepository.findOne(brandId)
    console.log('OMG!!! ====>', brand)
    return await this.modelsRepository.save({
      name,
      brand
    })
  }
}
