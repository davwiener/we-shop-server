import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  getAllProducts = (): Promise<Product[]> => {
    return this.productRepository.find()
  }

  getProductById = (id: number): Promise<Product> => {
    return this.productRepository.findOne(id)
  }

  createProduct = async (createProductDto: CreateProductDto): Promise<Product> => {
    const { name, description } = createProductDto
    return this.productRepository.save({
      name,
      description
    })
  }
}
