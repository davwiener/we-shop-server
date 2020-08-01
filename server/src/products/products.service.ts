import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from 'src/auth/user.entity';
import { GetProductsDto } from './dto/get-products.dto';
import { Category } from 'src/categories/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  getProducts = async (user: User, filter: GetProductsDto, sort: GetProductsDto): Promise<Product[]> => {
    return await this.productRepository.find()
  }

  getProductById = async (id: number, user: User): Promise<Product> => {
    return await this.productRepository.findOne({ where: { id, userId: user.id } })
  }

  createProduct = async (createProductDto: CreateProductDto): Promise<Product> => {
    const { name, description, categoryId } = createProductDto
    return await this.productRepository.save({
      name,
      description,
      categoryId
    })
  }
}
