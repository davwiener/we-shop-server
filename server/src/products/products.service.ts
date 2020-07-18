import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from 'src/auth/user.entity';
import { GetProductsDto } from './get-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  getProducts = (user: User, filter: GetProductsDto, sort: GetProductsDto): Promise<Product[]> => {
    console.log('filter', filter)
    console.log('sort', sort)
    return this.productRepository.find({ id: user.id })
  }

  getProductById = (id: number, user: User): Promise<Product> => {
    return this.productRepository.findOne({ where: { id, userId: user.id } })
  }

  createProduct = async (createProductDto: CreateProductDto): Promise<Product> => {
    const { name, description } = createProductDto
    return this.productRepository.save({
      name,
      description
    })
  }
}
