import { Controller, Post, UsePipes, ValidationPipe, Get, Body, Query } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { GetCategoriesDto } from './dto/getCategories.dto';
import { Product } from 'src/products/product.entity';
import { GetCategoryProductsDto } from './dto/categoryProducts.dto';
import { GetCategoryBrandsDto } from './dto/categoryBrands.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get('/')
  getAllCategories(getCategoriesDto: GetCategoriesDto): Promise<Category[]> {
    return this.categoryService.getCategories()
  }

  @Get('/products')
  getCategoryProducts(@Query() getCategoryProductsDto: GetCategoryProductsDto): Promise<{ id: number, name: string, brand: number }[]> {
    return this.categoryService.getCategoryProducts(getCategoryProductsDto)
  }

  @Get('/brands')
  getCategorybrands(@Query() getCategoryBrandsDto: GetCategoryBrandsDto): Promise<{ id: number, name: string, brand: number }[]> {
    return this.categoryService.getCategoryProducts(getCategoryBrandsDto)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto)
  }

}
