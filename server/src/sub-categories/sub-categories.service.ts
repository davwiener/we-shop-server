import { Injectable } from '@nestjs/common';
import { SubCategory } from './sub_category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
) {}

  getSubCategories = async (): Promise<SubCategory[]> => {
    return await this.subCategoryRepository.find({ select: ['id', 'name'], order: { name: 'ASC' } })
  }
}
