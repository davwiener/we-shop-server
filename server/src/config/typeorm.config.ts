import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config'
import { entities } from './entities'

const dbConfig = config.get('db')
console.log('dirname', __dirname)

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
	host: process.env.RDS_HOSTNAME || dbConfig.hostname,
	port: process.env.RDS_PORT || dbConfig.port,
	username: process.env.RDS_USERNAME || dbConfig.username,
	password: process.env.RDS_PASSWORD || dbConfig.password,
	database: process.env.RDS_DB_NAME || dbConfig.database,
	entities,
	synchronize: dbConfig.synchronize,
	logging: true
}
