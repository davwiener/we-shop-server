import { Controller, Post, UsePipes, ValidationPipe, Get, Body } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { GetCategoriesDto } from './dto/getCategories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get()
  getAllCategories(getCategoriesDto: GetCategoriesDto): Promise<Category[]> {
    return this.categoryService.getCategories()
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto)
  }

}
