import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from 'src/auth/user.entity';
import { GetProductsDto } from './dto/get-products.dto';
import { SearchAuctionsDto } from 'src/auctions/dto/create-auction.dto';
import { QueryFilterDto } from './dto/query-filter.dto';

@Injectable()
export class ProductsService {

  haveProductFilters = (searchAuctionDto: SearchAuctionsDto): boolean => {
    if (searchAuctionDto.model || searchAuctionDto.brand || searchAuctionDto.type) {
      return true;
    } else {
      false;
    }
  }

  /**
   * search for products in data base
   * @param searchAuctionDto the received request.
   */
  searchProductsInDto = async (searchAuctionDto: SearchAuctionsDto, selection?: string[]): Promise<any[]> => {
    const req: QueryFilterDto = {};
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
      if (selection) {
        req.select = selection;
      }
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
