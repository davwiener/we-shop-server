import { Controller, Logger, Get, Query, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { Brand } from './brand.entity';
import { Model } from 'src/models/models.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { GetBrandsDto } from './dto/get-brands-dto';

@Controller('brands')
export class BrandsController {
  logger = new Logger('Brands')
  constructor (private brandsService: BrandsService) {}

  @Get('/')
  getProdeucts(@Query() getBrandsDto: GetBrandsDto):  Promise<{
    brands: Brand[], 
    hasMore: boolean
  }> {
    return this.brandsService.fetchBrands(getBrandsDto.page, getBrandsDto.rbp, getBrandsDto.searchWord,
       getBrandsDto.categoryId, getBrandsDto.subCategoryId)
  }

  @Get('/models')
  fetchBrandModels(@Query('brand') brand: number): Promise<Model[]> {
    this.logger.log('Got a models request')
    return this.brandsService.fetchBrandModels(brand)
  }

  @Get('/full-brand')
  getBrandById(
    @Query('id') id: number,
    ): Promise<Brand> {
    return this.brandsService.getBrandById(id)
  }

  @Post('/new')
  @UsePipes(ValidationPipe)
  createBrand(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandsService.createBrand(createBrandDto)
  }

  @Post('/create_brands_from_json')
  createBrandsFromJson(): Promise<Brand[]>{
    return this.brandsService.createBrandsFromJson();
  }
}
