import "reflect-metadata";
import { DataSource } from "typeorm";
import { appConfig } from '../../consts'


export const AppDataSource = new DataSource({
  type: "mysql",
  host: appConfig.host,
  port: Number(appConfig.port),
  username: appConfig.username,
  password: appConfig.pass,
  database: appConfig.db,
  synchronize: true,
  logging: true, 
  entities: ['src/DAL/entities/**/*.ts'], 
  // migrations: ["src/migration/**/*.ts"],
  // subscribers: ["src/subscriber/**/*.ts"],
});
