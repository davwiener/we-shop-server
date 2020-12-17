import { Controller, Get, Post, Query } from '@nestjs/common';
import { GetSubCategoriesDto } from './dto/get-sub-categories.dto';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategory } from './sub_category.entity';

@Controller('sub_categories')
export class SubCategoriesController {
  constructor(private subCategoryService: SubCategoriesService) {}

  @Get('/all')
  getAllSubCategories(): Promise<SubCategory[]> {
    return this.subCategoryService.getAllSubCategories()
  }

  @Post('/create_sub_category_from_json')
  createCategoryFromJson(): Promise<SubCategory[]> {
    return this.subCategoryService.createSubCategoryFromJson()
  }

  @Get('/')
  getCategorySubCategories(@Query() getCategorySubCategoriesDto: GetSubCategoriesDto):  Promise<{
    subCategories: SubCategory[], 
    hasMore: boolean
  }> {
    return this.subCategoryService.getSubCategories(getCategorySubCategoriesDto.page, getCategorySubCategoriesDto.rbp, getCategorySubCategoriesDto.searchWord, getCategorySubCategoriesDto.categoryId)
  }
}
