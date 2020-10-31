import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from 'src/auth/user.entity';
import { GetProductsDto } from './dto/get-products.dto';
import { Category } from 'src/categories/category.entity';
import { SearchAuctionsDto } from 'src/auctions/dto/create-auction.dto';

@Injectable()
export class ProductsService {

  haveProductFilters = (searchAuctionDto: SearchAuctionsDto): boolean => {
    if (searchAuctionDto.model || searchAuctionDto.brand || searchAuctionDto.type) {
      return true;
    } else {
      false;
    }
  }

  searchProductsInDto = async (searchAuctionDto: SearchAuctionsDto): Promise<Product[]> => {
    const req: {
      type?: FindOperator<string>
			brand?: FindOperator<string>;
			model?: FindOperator<string>
		} = {};
	  if (searchAuctionDto.model) {
			req.model = Like("%" + searchAuctionDto.model + "%")
    }
    if (searchAuctionDto.brand) {
			req.brand = Like("%" + searchAuctionDto.brand + "%")
    }
    if (searchAuctionDto.type) {
			req.brand = Like("%" + searchAuctionDto.type + "%")
    }
    if (Object.keys(req).length) {
      return await this.productRepository.find(req);
    } else {
      return await Promise.resolve([]);
    }
  }
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  getProducts = async (user: User, categoryId: number, sort: GetProductsDto): Promise<Product[]> => {
    const products = await this.productRepository.find({ where: { category: categoryId } })
    return products;
  }

  getProductById = async (id: number, user: User): Promise<Product> => {
    return await this.productRepository.findOne({ where: { id, userId: user.id } })
  }

  createProduct = async (createProductDto: CreateProductDto): Promise<Product> => {
    const { name, description, brand, type, model, userId } = createProductDto
    const created_at = new Date()
    return await this.productRepository.save({
      name,
      description,
      type,
      brand,
      model,
      created_at,
      userId: 1
    })
  }
}
