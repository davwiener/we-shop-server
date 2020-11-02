import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/getCategories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
) {}

getCategories = async (): Promise<Category[]> => {
  return await this.categoryRepository.find({ select: ['id', 'name'], order: { name: 'ASC' } })
}

createCategory = async (createCategory: CreateCategoryDto): Promise<Category> => {
   const { name } = createCategory
   return await this.categoryRepository.save({
     name
   })
 }
}
