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
    const products = await this.productRepository.find()
    return products;
  }

  getProductById = async (id: number, user: User): Promise<Product> => {
    return await this.productRepository.findOne({ where: { id, userId: user.id } })
  }

  createProduct = async (createProductDto: CreateProductDto): Promise<Product> => {
    const { name, description, company_name, type, model, userId } = createProductDto
    const created_at = new Date()
    return await this.productRepository.save({
      name,
      description,
      type,
      company_name,
      model,
      created_at,
      userId: 1
    })
  }
}
