import { Module } from '@nestjs/common';
import { AuctionsModule } from './auctions/auctions.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm';
import { Auction } from './auctions/auction.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "??Poi000",
      database: "we_shop",
      entities: [Auction],
      synchronize: true,
      logging: true
  }), AuctionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
