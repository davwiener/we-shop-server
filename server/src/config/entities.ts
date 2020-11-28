import { User } from "src/auth/user.entity";
import { Auction } from "src/auctions/auction.entity";
import { Product } from "src/products/product.entity";
import { Category } from "src/categories/category.entity";
import { Account } from "src/accounts/account.entity";
import { Brand } from "src/brands/brand.entity";
import { Model } from "src/models/models.entity";
import { SubCategory } from "src/sub-categories/sub_category.entity";

export const entities = [User, Auction, Product, Category, Account, Brand, Model, SubCategory]
