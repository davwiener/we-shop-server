import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoryProductsDto } from './dto/categoryProducts.dto';
import { Product } from 'src/products/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Category)
    private productRepository: Repository<Product>
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

 getCategoryProducts = async (getCategoryProducts: GetCategoryProductsDto): Promise<{ id: number, name: string, brand: number }[]> => {
   const { category } = getCategoryProducts
   const result = await this.categoryRepository.findOne(category, { relations: ['products'] })
   return result.products.map(product => ({ id: product.id, name: product.name, brand: product.brand.id }))
 }
}