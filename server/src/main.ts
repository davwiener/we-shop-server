import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config'
import { CategoriesService } from './categories/categories.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { BrandsService } from './brands/brands.service';
import { ModelsService } from './models/models.service';
import { ProductsService } from './products/products.service';

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);
  
  const serverConfig = config.get('server')

  // if (process.env.NODE_ENV === 'development') {
    app.enableCors()
  // } else {
    // app.enableCors({ origin: serverConfig.origin })
  // }
  app.setGlobalPrefix('api');
  await app.listen(serverConfig.port);
  const args = process.argv.slice(2);
  if(args[0] === "buildDataBase") {
    if (args[1] === 'onlyProducts') {
      const productsService = app.get<ProductsService>(ProductsService)
      productsService.creatAllProducts();
        return;
    }
    const categoriesService = app.get<CategoriesService>(CategoriesService)
    categoriesService.createCategoryFromJson();
    const subCategoriesService = app.get<SubCategoriesService>(SubCategoriesService)
    subCategoriesService.createSubCategoryFromJson();
    const brandsService = app.get<BrandsService>(BrandsService)
    brandsService.createBrandsFromJson();
    const modelsService = app.get<ModelsService>(ModelsService)
    modelsService.createModelsFromJson();
    if (args[1] === 'products') {
      const productsService = app.get<ProductsService>(ProductsService)
      productsService.creatAllProducts();
    }
  }
  //console.log({ myVar: process.env.npm_config_myVar })
  logger.log(`app is renning on port ${serverConfig.port}`)
}
bootstrap();
