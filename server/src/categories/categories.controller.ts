import { Controller, Post, UsePipes, ValidationPipe, Get, Body, Query } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { GetCategoriesDto } from './dto/getCategories.dto';
import { Product } from 'src/products/product.entity';
import { GetCategoryProductsDto } from './dto/categoryProducts.dto';
import { GetCategoryBrandsDto } from './dto/categoryBrands.dto';
import { GetCategorySubCategoriesDto } from './dto/categorySubCategories.dto';

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
  getCategorybrands(@Query() getCategoryBrandsDto: GetCategoryBrandsDto): Promise<{ id: number, name: string }[]> {
    return this.categoryService.getCategoryBrands(getCategoryBrandsDto)
  }

  @Get('/sub_categories')
  getCategorySubCategories(@Query() getCategorySubCategoriesDto: GetCategorySubCategoriesDto): Promise<{ id: number, name: string }[]> {
    return this.categoryService.getCategorySubCategoriesDto(getCategorySubCategoriesDto)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto)
  }

}
