import { Injectable } from '@nestjs/common';
import { SubCategory } from './sub_category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/category.entity';
import * as _ from 'lodash'
@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
    private categoriesService: CategoriesService
  ) { }

  getSubCategories = async (): Promise<SubCategory[]> => {
    return await this.subCategoryRepository.find({ select: ['id', 'name'], order: { name: 'ASC' } })
  }

  getDetailSubCategories = async (): Promise<SubCategory[]> => {
    return await this.subCategoryRepository.find()
  }

  createSubCategoryFromJson = async (): Promise<SubCategory[]> => {
    let obj = JSON.parse(fs.readFileSync('./data/sabCategories.json', 'utf8'));
    let categoriesIdsMap = {};
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
    console.log(obj);
    return await this.subCategoryRepository.save(obj);
  }

}
