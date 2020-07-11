import { Module } from '@nestjs/common';
import { AuctionsModule } from './auctions/auctions.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm';
import { Auction } from './auctions/auction.entity'
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "we_shop",
      entities: [Auction, Product],
      synchronize: true,
      logging: true
  }), AuctionsModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
