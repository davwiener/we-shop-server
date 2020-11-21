
const needle = require("needle");

const options = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
  }
};

async function parsingYad2() {
  const catResult = await needle(
      "get",
      `https://www.yad2.co.il/api/search/options/products/all?fields=category`,
      options
  );
  const categories = catResult.body.category;
  let subCatrgories = [];
  let brands = [];
  let types = [];
  let models = [];
  for (const category of categories) {
    const subCatResult = await needle(
        "get",
        `https://www.yad2.co.il/api/search/options/products/all?fields=item&category=${category.value}`,
        options
    );
    subCatrgories = subCatrgories.concat(subCatResult.body.item.map(currItem => {
      return {...currItem, categoryId: category.value}
    }));
    await sleep();
  }
  for (const subCategory of subCatrgories) {
    let manufacturerAndTypeRes = await needle(
        "get",
        `https://www.yad2.co.il/api/search/options/products/all?fields=type&item=${subCategory.value}`,
        options
    );
    if (manufacturerAndTypeRes.body.type) {
      types = types.concat(manufacturerAndTypeRes.body.type.map(currItem => {
        return {...currItem, categoryId: subCategory.value, subCategoryId: subCategory.value}
      }));
    }
    if (manufacturerAndTypeRes.body.manufacturer) {
      types = types.concat(manufacturerAndTypeRes.body.manufacturer.map(currItem => {
        return {...currItem, categoryId: subCategory.value, subCategoryId: subCategory.value}
      }));
    }


    await sleep();
      manufacturerAndTypeRes = await needle(
        "get",
        `https://www.yad2.co.il/api/search/options/products/all?fields=manufacturer&category=${subCategory.categoryId}&item=${subCategory.value}`,
        options
    );
    if (manufacturerAndTypeRes.body.type) {
      types = types.concat(manufacturerAndTypeRes.body.type.map(currItem => {
        return {...currItem, categoryId: subCategory.categoryId, subCategoryId: subCategory.value}
      }));
    }
    if (manufacturerAndTypeRes.body.manufacturer) {
      brands = brands.concat(manufacturerAndTypeRes.body.manufacturer.map(currItem => {
        return {...currItem, categoryId: subCategory.categoryId, subCategoryId: subCategory.value}
      }));
    }
    await sleep();
  }
  for (const brand of brands) {
    const modelResult = await needle(
        "get",
        `https://www.yad2.co.il/api/search/options/products/all?fields=manufacturID_model&manufacturer=${brand.value}&category=${brand.categoryId}&item=${brand.subCategoryId}`,
        options
    );
    models = models.concat(modelResult.body.manufacturID_model.map(currItem => {
      return {...currItem, categoryId: brand.categoryId, subCategoryId: brand.subCategoryId, manufacturerId: brand.value}
    }));
    await sleep();
  }
  console.log(categories);
  console.log(subCatrgories);
  console.log(types);
  console.log(brands);
  console.log(models);


}

async function sleep() {
  const miliseconds = 1000 + Math.random() * 1000;
  return new Promise(resolve => setTimeout(resolve, miliseconds));
}

parsingYad2();

