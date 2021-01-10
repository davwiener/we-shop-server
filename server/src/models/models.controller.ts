import { Controller, Logger, Get, Post, UsePipes, ValidationPipe, Body, Query } from '@nestjs/common';
import { ModelsService } from './models.service';
import { Model } from './models.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { GetModelsDto } from './dto/get-models.dto';

@Controller('models')
export class ModelsController {
  logger = new Logger('Brands')
  constructor (private modelsService: ModelsService) {}

  @Get('/')
  getProdeucts(@Query() getBrandsDto: GetModelsDto):  Promise<{
    models: Model[], 
    hasMore: boolean
  }> {
    return this.modelsService.fetchModels(getBrandsDto.page, getBrandsDto.rbp, getBrandsDto.searchWord,
       getBrandsDto.categoryId, getBrandsDto.subCategoryId, getBrandsDto.brandId)
  }

  @Post('/new')
  @UsePipes(ValidationPipe)
  createBrand(@Body() createModelDto: CreateModelDto): Promise<Model> {
    return this.modelsService.createModel(createModelDto)
  }

  @Post('/create_models_from_json')
  @UsePipes(ValidationPipe)
  createModelsFromJson(): Promise<Model[]> {
    return this.modelsService.createModelsFromJson()
  }
  
  @Get('/full-model')
  getModelById(
    @Query('id') id: number,
    ): Promise<Model> {
    return this.modelsService.getModelById(id)
  }
}
