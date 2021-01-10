import { Injectable } from '@nestjs/common';
import { Model } from './models.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateModelDto } from './dto/create-model.dto';
import { Brand } from 'src/brands/brand.entity';
import * as _ from 'lodash'
import * as fs from 'fs';
import { BrandsService } from 'src/brands/brands.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/category.entity';
import { SubCategory } from 'src/sub-categories/sub_category.entity';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private modelsRepository: Repository<Model>,
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>,
    private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoriesService,
    private brandsService: BrandsService
  ) { }

  fetchModels = async (page?: number, rbp?: number, searchWord?: string, categoryId?: number, subCategoryId?: number, brandId?: number): Promise<{
    models: Model[],
    hasMore: boolean
  }> => {
    const query = this.modelsRepository.createQueryBuilder('model').
      limit(Number(rbp) + 1).
      offset(rbp * (page - 1)).
      where(`model.name LIKE '%${searchWord}%'`)
    if (brandId > 0) {
      query.leftJoinAndSelect("model.brand", "brand").andWhere("brand.id = :id", { id: Number(brandId) });
    }
    else if (subCategoryId > 0) {
      query.leftJoinAndSelect("model.subCategory", "subCategory").andWhere("subCategory.id = :id", { id: Number(subCategoryId) });
    }
    else if (categoryId > 0) {
      query.leftJoinAndSelect("model.category", "category").andWhere("category.id = :id", { id: Number(categoryId) });
    }
    return query.getMany().then((models: Model[]) => {
      const hasMore = models.length > Number(rbp)
      return { models, hasMore }
    })
  }
  fetchDetailModels = async (): Promise<Model[]> => {
    return await this.modelsRepository.find({ order: { name: 'ASC' }, relations: ['category', 'sub_category', 'brand'] })
  }

  getModelById = async (id: number): Promise<Model> => {
    return await this.modelsRepository.findOne(
      {
        where: { id },
        relations: ['category', 'subCategory', 'brand']
      })
  }

  createModel = async ({ name, brandId }: CreateModelDto): Promise<Model> => {
    const brand = await this.brandsRepository.findOne(brandId)
    console.log('OMG!!! ====>', brand)
    return await this.modelsRepository.save({
      name,
      brand
    })
  }
  createModelsFromJson = async (): Promise<Model[]> => {
    let obj = JSON.parse(fs.readFileSync('./data/models.json', 'utf8'));
    let categoriesIdsMap = {};
    let subCategoriesIdsMap = {};
    let brandsIdsMap = {};
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

        const indexArrayBrand = _.get(brandsIdsMap, entry.manufacturerId, []);
        indexArrayBrand.push(index);
        const idObjectBrand = {};
        idObjectBrand[entry.manufacturerId] = indexArrayBrand;
        brandsIdsMap = {
          ...brandsIdsMap,
          ...idObjectBrand
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
        obj[index].category = category;
      });
    })

    const subCategories = await this.subCategoriesService.getDetailSubCategories();
    Object.keys(subCategoriesIdsMap).forEach(key => {
      const subCategory = subCategories.find((cat: SubCategory) => cat.id.toString() === key);
      subCategoriesIdsMap[key].forEach(index => {
        obj[index].sub_category = subCategory;
      });
    })

    const brands = await this.brandsService.fetchDetailBrands();
    Object.keys(brandsIdsMap).forEach(key => {
      const brand = brands.find((br: Brand) => br.id.toString() === key);
      brandsIdsMap[key].forEach(index => {
        obj[index].brand = brand;
      });
    });

    console.log(obj);
    return await this.modelsRepository.save(obj);
  }
}
