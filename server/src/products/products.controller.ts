import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetProductsDto } from './get-products.dto';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('filter') filter: GetProductsDto, 
    @Query('sort') sort: GetProductsDto, 
    @GetUser() user: User): Promise<Product[]> {
    return this.productsService.getProducts(user, filter, sort)
  }

  @Get('/:id')
  getProductById(
    @Param('id') id: number,
    @GetUser() user: User
    ): Promise<Product> {
    return this.productsService.getProductById(id, user)
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto)
  }
}
