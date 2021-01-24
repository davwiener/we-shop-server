"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ProductsService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm");
var product_entity_1 = require("./product.entity");
var category_entity_1 = require("src/categories/category.entity");
var ProductsService = /** @class */ (function () {
    function ProductsService(productRepository, categoryRepository, categoriesService, subCategoriesService, modelService) {
        var _this = this;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.categoriesService = categoriesService;
        this.subCategoriesService = subCategoriesService;
        this.modelService = modelService;
        this.haveProductFilters = function (searchAuctionDto) {
            if (searchAuctionDto.model || searchAuctionDto.brand || searchAuctionDto.type) {
                return true;
            }
            else {
                false;
            }
        };
        /**
         * search for products in data base
         * @param searchAuctionDto the received request.
         */
        this.searchProductsInDto = function (searchAuctionDto, selection) { return __awaiter(_this, void 0, Promise, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = {};
                        if (searchAuctionDto.model) {
                            req.model = typeorm_2.Like("%" + searchAuctionDto.model + "%");
                        }
                        if (searchAuctionDto.brand) {
                            req.brand = typeorm_2.Like("%" + searchAuctionDto.brand + "%");
                        }
                        if (searchAuctionDto.type) {
                            req.brand = typeorm_2.Like("%" + searchAuctionDto.type + "%");
                        }
                        if (!Object.keys(req).length) return [3 /*break*/, 1];
                        if (selection) {
                            req.select = selection;
                        }
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, Promise.resolve([])];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getProducts = function (page, rbp, searchWord, categoryId, subCategoryId) { return __awaiter(_this, void 0, Promise, function () {
            var query;
            return __generator(this, function (_a) {
                query = this.productRepository.createQueryBuilder('product').
                    limit(Number(rbp) + 1).
                    offset(rbp * (page - 1)).
                    where("product.name LIKE '%" + searchWord + "%'");
                if (subCategoryId > 0) {
                    query.leftJoinAndSelect("product.category", "category").andWhere("category.id = :id", { id: Number(categoryId) });
                }
                if (categoryId > 0) {
                    query.leftJoinAndSelect("product.subCategory", "subCategory").andWhere("subCategory.id = :id", { id: Number(subCategoryId) });
                }
                return [2 /*return*/, query.getMany().then(function (products) {
                        var hasMore = products.length > Number(rbp);
                        return { products: products, hasMore: hasMore };
                    })];
            });
        }); };
        this.getProductById = function (id, user) { return __awaiter(_this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productRepository.findOne({ where: { id: id, userId: user.id } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.createProduct = function (createProductDto) { return __awaiter(_this, void 0, Promise, function () {
            var name, description, brandId, modelId, created_at;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = createProductDto.name, description = createProductDto.description, brandId = createProductDto.brandId, modelId = createProductDto.modelId;
                        created_at = new Date();
                        return [4 /*yield*/, this.productRepository.save({
                                name: name,
                                description: description,
                                brandId: brandId,
                                modelId: modelId,
                                created_at: created_at
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.creatAllProducts = function () { return __awaiter(_this, void 0, void 0, function () {
            var categories, products, subCategoriesId, subCatIdToCat, subCategories, models, brands;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.categoriesService.getDetailCategories()];
                    case 1:
                        categories = _a.sent();
                        products = [];
                        subCategoriesId = [];
                        subCatIdToCat = {};
                        categories.forEach(function (cat) {
                            subCategoriesId = subCategoriesId.concat(cat.sub_categories.filter(function (subCat) { return !subCategoriesId.find(function (id) { return id === subCat.id; }); }).map(function (sc) {
                                subCatIdToCat[sc.id] = cat;
                                return sc.id;
                            }));
                        });
                        return [4 /*yield*/, this.subCategoriesService.getDetailSubCategoriesByIds(subCategoriesId)];
                    case 2:
                        subCategories = _a.sent();
                        return [4 /*yield*/, this.modelService.fetchDetailModels()];
                    case 3:
                        models = _a.sent();
                        brands = [];
                        //let models = [];
                        subCategories.forEach(function (subCat) {
                            brands = brands.concat(subCat.brands.filter(function (currBrand) { return !brands.find(function (br) { return br.id === currBrand.id; }); }).map(function (br) { return (__assign(__assign({}, br), { subCategory: subCat })); }));
                            //models = models.concat(subCat.models.filter((currModels: Model) => !models.find(id => id === currModels.id)))
                        });
                        brands = brands.filter(function (br) { return !models.find(function (model) { return model.brand.id === br.id; }); });
                        brands.forEach(function (br) {
                            var product = {};
                            product.name = br.name;
                            product.id = products.length + 1;
                            product.description = '';
                            product.category = subCatIdToCat[br.subCategory.id];
                            product.subCategory = br.subCategory;
                            product.brand = br;
                            product.created_at = new Date();
                            products.push(product);
                        });
                        models.forEach(function (model) {
                            var product = {};
                            product.name = model.name;
                            product.id = products.length + 1;
                            product.description = '';
                            product.category = model.category;
                            product.subCategory = model.sub_category;
                            product.brand = model.brand;
                            product.model = model;
                            product.created_at = new Date();
                            products.push(product);
                        });
                        return [4 /*yield*/, this.productRepository.save([])];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    }
    ProductsService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(product_entity_1.Product)),
        __param(1, typeorm_1.InjectRepository(category_entity_1.Category))
    ], ProductsService);
    return ProductsService;
}());
exports.ProductsService = ProductsService;
