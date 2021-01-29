import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoryProductsDto } from './dto/categoryProducts.dto';
import { GetCategoryBrandsDto } from './dto/categoryBrands.dto';
import { Product } from 'src/products/product.entity';
import * as fs from 'fs';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Category)
    private productRepository: Repository<Product>
) {}

getCategories = async (page: number, rbp: number, searchWord: string): Promise<{
  categories: Category[], 
  hasMore: boolean
}> => {
  return await this.categoryRepository.findAndCount({ 
      take: rbp ,
      skip: rbp * (page -1),
      select: ['id', 'name'],
      order: { name: 'ASC'},
      where: `Category.name LIKE '%${searchWord}%'`
    }).then(([categories, numberOfcategories]: [Category[], number]) => {
      const hasMore = categories.length === Number(rbp) && categories.length < numberOfcategories
      return {categories, hasMore}
    })
}

getDetailCategories = async (): Promise<Category[]> => {
  return await this.categoryRepository.find()
}

createCategory = async (createCategory: CreateCategoryDto): Promise<Category> => {
   const { name } = createCategory
   return await this.categoryRepository.save({
     name
   })
 }

 createCategoryFromJson = async (): Promise<Category> => {
  let obj = JSON.parse(fs.readFileSync('./data/categories.json', 'utf8'));
  obj = obj.filter(entry => !entry.isHighlighted).map(entry => ({
      id: entry.value,
      name: entry.text,
      created_at: new Date()
  }))
  console.log('here');
  return await this.categoryRepository.save(obj);
}


 getCategoryProducts = async (getCategoryProducts: GetCategoryProductsDto): Promise<{ id: number, name: string, brand: number }[]> => {
   const { category } = getCategoryProducts
   const result = await this.categoryRepository.findOne(category, { relations: ['products', 'brands'] })
   return result.products.map(product => ({ id: product.id, name: product.name, brand: product.brand.id }))
 }

 getCategoryBrands = async (getCategoryBrands: GetCategoryBrandsDto): Promise<{ id: number, name: string }[]> => {
   const { category } = getCategoryBrands
   const result = await this.categoryRepository.findOne(category, { relations: ['brands'] })
   return result.brands.map(brand => ({ id: brand.id, name: brand.name }))
 }
}
