import { Injectable } from '@nestjs/common';
import { Brand } from './brand.entity';
import { Repository, Like, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'src/models/models.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Category } from 'src/categories/category.entity';
import * as fs from 'fs';
import { CategoriesService } from 'src/categories/categories.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import * as _ from 'lodash'
import { SubCategory } from 'src/sub-categories/sub_category.entity';
import * as moment from 'moment';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoriesService,
  ) { }

  fetchBrands = async (page?: number, rbp?: number, searchWord?: string, categoryId?: number, subCategoryId?: number): Promise<{
    brands: Brand[],
    hasMore: boolean
  }> => {
    const query = this.brandRepository.createQueryBuilder('brand').
      limit(Number(rbp) + 1).
      offset(rbp * (page - 1)).
      where(`brand.name LIKE '%${searchWord}%'`)
    if (subCategoryId > 0) {
      query.leftJoinAndSelect("brand.subCategories", "subCategory").andWhere("subCategory.id = :id", { id: Number(subCategoryId) });
    }
    else if (categoryId > 0) {
      query.leftJoinAndSelect("brand.categories", "category").andWhere("category.id = :id", { id: Number(categoryId) });
    }
    return query.getMany().then((brands: Brand[]) => {
      const hasMore = brands.length > Number(rbp)
      return { brands, hasMore }
    })
  }


  getBrandById = async (id: number): Promise<Brand> => {
    return await this.brandRepository.findOne(
      {
        where: { id },
        relations: ['categories', 'subCategories']
      })
  }

  fetchDetailBrands = async (): Promise<Brand[]> => {
    return await this.brandRepository.find({ order: { name: 'ASC' } })
  }

  fetchBrandModels = async (brand: number): Promise<Model[]> => {
    return await this.modelRepository.find({ where: { brand: brand }, select: ['id', 'name'], order: { name: 'ASC' } })
  }

  createBrand = async ({ name, categoryId, subCategoryId }: CreateBrandDto): Promise<Brand> => {
    if(subCategoryId) {
      return await this.brandRepository.save({
        name,
        categories: [{ id: categoryId }],
        subCategories: [{ id: subCategoryId }],
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    } else {
      return await this.brandRepository.save({
        name,
        categories: [{ id: categoryId }],
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    }
  }

  createBrandsFromJson = async (): Promise<Brand[]> => {
    let obj = JSON.parse(fs.readFileSync('./data/brands.json', 'utf8'));
    let categoriesIdsMap = {};
    let subCategoriesIdsMap = {};
    obj = obj.filter((entry, index) => obj.findIndex(val => val.value === entry.value) === index).
      map((entry, index) => {
        const indexArray = _.get(categoriesIdsMap, entry.categoryId, []);
        indexArray.push(index);
        const idObject = {};
        idObject[entry.categoryId] = indexArray;
        categoriesIdsMap = {
          ...categoriesIdsMap,
          ...idObject
        }
        const indexArraySubCat = _.get(subCategoriesIdsMap, entry.subCategoryId, []);
        indexArraySubCat.push(index);
        const idObjectSubCat = {};
        idObjectSubCat[entry.subCategoryId] = indexArraySubCat;
        subCategoriesIdsMap = {
          ...subCategoriesIdsMap,
          ...idObjectSubCat
        }
        return {
          id: entry.value,
          name: entry.text,
          created_at: new Date()
        }
      });
    const categories = await this.categoriesService.getDetailCategories();
    Object.keys(categoriesIdsMap).forEach(key => {
      const category = categories.find((cat: Category) => cat.id.toString() === key);
      categoriesIdsMap[key].forEach(index => {
        obj[index].categories = _.get(obj[index], 'category.length') ?
          obj[index].category.push(category) : [category];
      });
    })

    const subCategories = await this.subCategoriesService.getAllSubCategories();
    Object.keys(subCategoriesIdsMap).forEach(key => {
      const subCategory = subCategories.find((cat: SubCategory) => cat.id.toString() === key);
      subCategoriesIdsMap[key].forEach(index => {
        obj[index].subCategories = _.get(obj[index], 'subCategories.length') ?
          obj[index].subCategories.push(subCategory) : [subCategory];
      });
    })

    console.log(obj);
    return await this.brandRepository.save(obj);
  }
}

