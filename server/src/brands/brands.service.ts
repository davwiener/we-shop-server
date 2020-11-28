import { Injectable } from '@nestjs/common';
import { Brand } from './brand.entity';
import { Repository, Like, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'src/models/models.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Category } from 'src/categories/category.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
) {}

  fetchBrands = async (): Promise<Brand[]> => {
    return await this.brandRepository.find({ select: ['id', 'name'], order: { name: 'ASC' } })
  }

  fetchBrandModels = async (brand: number): Promise<Model[]> => {
    return await this.modelRepository.find({ where: { brand: brand }, select: ['id', 'name'], order: { name: 'ASC' } })
  }

  createBrand = async ({ name, categories }: CreateBrandDto): Promise<Brand> => {
    const cats = await this.categoryRepository.find({ where: { id: In(categories) } } )
    return await this.brandRepository.save({
      name,
      categories: cats
    })
  }
}
