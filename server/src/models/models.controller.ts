import { Controller, Logger, Get, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { ModelsService } from './models.service';
import { Model } from './models.entity';
import { CreateModelDto } from './dto/create-model.dto';

@Controller('models')
export class ModelsController {
  logger = new Logger('Brands')
  constructor (private modelsService: ModelsService) {}

  @Get('/')
  fetchModels(): Promise<Model[]> {
    return this.modelsService.fetchModels()
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
  
}
