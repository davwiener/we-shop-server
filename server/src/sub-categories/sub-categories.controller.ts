import { Controller, Get, Post } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategory } from './sub_category.entity';

@Controller('sub_categories')
export class SubCategoriesController {
  constructor(private subCategoryService: SubCategoriesService) {}

  @Get('/')
  getAllSubCategories(): Promise<SubCategory[]> {
    return this.subCategoryService.getSubCategories()
  }

  @Post('/create_sub_category_from_json')
  createCategoryFromJson(): Promise<SubCategory[]> {
    return this.subCategoryService.createSubCategoryFromJson()
  }
}
