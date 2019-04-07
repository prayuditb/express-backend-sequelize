import { Sequelize, Model } from "sequelize";
import userFactory, { User } from "./user.model";
import allConfig from "../config"

export type DB = {
  sequelize: Sequelize
  User: any
  [key: string]: any
}

const env = process.env.NODE_ENV || "development";
const config = allConfig[env];
const sequelize = new Sequelize(config.database, config.username, config.passowrd, config)
const db: DB = {
  sequelize,
  User: userFactory(sequelize),
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;