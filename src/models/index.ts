import { Sequelize, Model } from "sequelize";
import userFactory, { User } from "./user.model";

type DB = {
  sequelize: Sequelize
  User: any
  [key: string]: any
}

const env = process.env.NODE_ENV || "development";
const config = require("/../config/index.ts")[env];
const sequelize = new Sequelize(config.url || process.env.DATABSE_CONNECTION_URI, config);
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