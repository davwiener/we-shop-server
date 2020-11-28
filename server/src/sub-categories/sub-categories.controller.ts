import { Controller, Get } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategory } from './sub_category.entity';

@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private subCategoryService: SubCategoriesService) {}

  @Get('/')
  getAllSubCategories(): Promise<SubCategory[]> {
    return this.subCategoryService.getSubCategories()
  }
}
