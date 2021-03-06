import { Controller, Get, Post, Body, Param, UseGuards, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetProductsDto } from './dto/get-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getProdeucts(@Query() getProdeuctsDto: GetProductsDto):  Promise<{
    products: Product[], 
    hasMore: boolean
  }> {
    return this.productsService.getProducts(getProdeuctsDto.page, getProdeuctsDto.rbp, getProdeuctsDto.searchWord,
       getProdeuctsDto.categoryId, getProdeuctsDto.subCategoryId, getProdeuctsDto.brandId)
  }

  @Get('/full-product')
  getProductById(
    @Query('id') id: number,
    ): Promise<Product> {
    return this.productsService.getProductById(id)
  }

  @Post('/save')
  @UsePipes(ValidationPipe)
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto)
  }

  @Post('/create-all-products')
  creatAllProducts(): any {
    return this.productsService.creatAllProducts();
  }
}
