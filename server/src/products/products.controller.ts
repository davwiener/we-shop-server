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

  @Get("/getProducts")
  getProducts(
    @Query('category') categoryId: number,
    @Query('sort') sort: GetProductsDto,
    @GetUser(ValidationPipe) user: User): Promise<Product[]> {
    return this.productsService.getProducts(user, categoryId, sort)
  }

  @Get('/:id')
  getProductById(
    @Param('id') id: number,
    @GetUser(ValidationPipe) user: User
    ): Promise<Product> {
    return this.productsService.getProductById(id, user)
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
