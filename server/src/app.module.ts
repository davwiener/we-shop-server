import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from 'src/config/typeorm.config';
import { AuctionsModule } from './auctions/auctions.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    AuctionsModule,
    ProductsModule,
    CategoriesModule,
    AccountsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
