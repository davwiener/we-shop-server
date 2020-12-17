import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from 'src/auth/user.entity';
import { SearchAuctionsDto } from 'src/auctions/dto/create-auction.dto';
import { QueryFilterDto } from './dto/query-filter.dto';
import { Category } from 'src/categories/category.entity';
import { CategoriesService } from 'src/categories/categories.service';
import {SubCategoriesService} from 'src/sub-categories/sub-categories.service'
import { SubCategory } from 'src/sub-categories/sub_category.entity';
import { Model } from 'src/models/models.entity';
import { ModelsService } from 'src/models/models.service';
import { Brand } from 'src/brands/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoriesService,
    private modelService: ModelsService
  ) {}

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
      // return await this.productRepository.find(req);
    } else {
      return await Promise.resolve([]);
    }
  }

  getProducts = async (page?: number, rbp?: number, searchWord?: string, categoryId?: number, subCategoryId?: number): Promise<{
    products: Product[], 
    hasMore: boolean
  }> => {
    const query = this.productRepository.createQueryBuilder('product').
    limit(Number(rbp) + 1).
    offset(rbp * (page -1)).
    select(['product.id', 'product.name']).
    where(`product.name LIKE '%${searchWord}%'`)
    if(subCategoryId > 0) {
      query.andWhere("product.subCategoryId = :subCategoryId", {subCategoryId})
    }
    if(categoryId > 0) {
      query.andWhere("product.categoryId = :categoryId", {categoryId})
    } 
    return query.getMany().then((products: Product[]) => {
        const hasMore = products.length > Number(rbp)
        return {products, hasMore}
      })
  }

  getProductById = async (id: number, user: User): Promise<Product> => {
    return await this.productRepository.findOne({ where: { id, userId: user.id } })
  }

  createProduct = async (createProductDto: CreateProductDto): Promise<Product> => {
    const { name, description, brandId, modelId } = createProductDto
    const created_at = new Date()
    return await this.productRepository.save({
      name,
      description,
      brandId,
      modelId,
      created_at,
    })
  }

  creatAllProducts = async () => {
    const categories = await this.categoriesService.getDetailCategories();
    const products: Product[] = [];
    let subCategoriesId = [];
    const subCatIdToCat = {}
    categories.forEach(cat => {
      subCategoriesId = subCategoriesId.concat(cat.sub_categories.filter((subCat: SubCategory) => !subCategoriesId.find(id => id === subCat.id)).map
        ((sc: SubCategory) => { 
          subCatIdToCat[sc.id] = cat;
          return sc.id 
        }));
    })
    const subCategories = await this.subCategoriesService.getDetailSubCategoriesByIds(subCategoriesId);
    const models = await this.modelService.fetchDetailModels();
    let brands = [];
    //let models = [];
    subCategories.forEach(subCat => {
      brands = brands.concat(subCat.brands.filter((currBrand: Brand) => !brands.find(br => br.id === currBrand.id)).map(
        br => ({
          ...br,
          subCategory: subCat
        })
      ))
      //models = models.concat(subCat.models.filter((currModels: Model) => !models.find(id => id === currModels.id)))
    });
    brands = brands.filter(br => !models.find(model => model.brand.id === br.id));
    brands.forEach(br => {
      const product: Product = <Product>{};
      product.name = br.name;
      product.id = products.length + 1;
      product.description = '';
      product.category = subCatIdToCat[br.subCategory.id];
      product.subCategory = br.subCategory;
      product.brand = br;
      product.created_at = new Date();
      products.push(product)
    });
    models.forEach(model => {
      const product: Product = <Product>{};
      product.name = model.name;
      product.id = products.length + 1;
      product.description = '';
      product.category = model.category
      product.subCategory = model.sub_category;
      product.brand = model.brand;
      product.model = model;
      product.created_at = new Date();
      products.push(product)
    })
    return await this.productRepository.save([])
   
  }
}
