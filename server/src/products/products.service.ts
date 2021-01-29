import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from 'src/auth/user.entity';
import { SearchAuctionsDto } from 'src/auctions/dto/create-auction.dto';
import { QueryFilterDto } from './dto/query-filter.dto';
import { Category } from 'src/categories/category.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service'
import { SubCategory } from 'src/sub-categories/sub_category.entity';
import { Model } from 'src/models/models.entity';
import { ModelsService } from 'src/models/models.service';
import { Brand } from 'src/brands/brand.entity';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoriesService,
    private modelService: ModelsService,
    private brandService: BrandsService,
  ) { }

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

  getProducts = async (page?: number, rbp?: number, searchWord?: string, categoryId?: number, subCategoryId?: number, brandId?: number): Promise<{
    products: Product[],
    hasMore: boolean
  }> => {
    const query = this.productRepository.createQueryBuilder('product').
      limit(Number(rbp) + 1).
      offset(rbp * (page - 1)).
      where(`product.name LIKE '%${searchWord}%'`)
    if (brandId > 0) {
      query.innerJoin("product.brand", "brand", "brand.id = :id", { id: Number(brandId) })
    } else if (subCategoryId > 0) {
      query.innerJoin("product.subCategory", "subCategory", "subCategory.id = :id", { id: Number(subCategoryId) })
    } else if (categoryId > 0) {
      query.innerJoin("product.category", "category", "category.id = :id", { id: Number(categoryId) })
    }
    return query.getMany().then((products: Product[]) => {
      const hasMore = products.length > Number(rbp)
      return { products, hasMore }
    })
  }

  getProductById = async (id: number): Promise<Product> => {
    return await this.productRepository.findOne(
      {
        where: { id },
        relations: ['category', 'subCategory', 'brand', 'model']
      })
  }

  createProduct = async (createProductDto: CreateProductDto): Promise<Product> => {
    const { productName, description, brand, model, category, subCategory } = createProductDto;
    const created_at = new Date()
    let product = {
      name: productName,
      description,
      category: {id: category.id},
      created_at,
      pending: true
    };
    if((!brand.id || brand.id < 0)  && brand.name) {
     const createdBrand = await this.brandService.createBrand({
       name: brand.name, categoryId: category.id, subCategoryId: subCategory.id
     })
      product['brand'] = createdBrand;
      const createdModel = await this.modelService.createModel({
        name: model.name, categoryId: category.id, subCategoryId: subCategory.id, brandId: brand.id, brand: createdBrand
      })
      product['model'] = createdModel;
    } else {
      product['brandId'] = {id: brand.id}
      if((!model.id || model.id )< 0 && model.name) {
        const createdModel = await this.modelService.createModel({
          name: model.name, categoryId: category.id, subCategoryId: subCategory.id, brandId: brand.id
        })
        product['model'] = createdModel;
      } else {
        product['modelId'] = {id: model.id}
      }
    }
    if(subCategory) {
      product['subCategory'] = {id: subCategory.id}
    }
    return await this.productRepository.save(product)
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
      product.pending = false;
      products.push(product)
    });
    models.forEach(model => {
      const product: Product = <Product>{};
      product.name = model.name;
      product.id = products.length + 1;
      product.description = '';
      product.category = model.category
      product.subCategory = model.subCategory;
      product.brand = model.brand;
      product.model = model;
      product.created_at = new Date();
      product.pending = false;
      products.push(product)
    })
    return await this.productRepository.save(products);

  }
}
