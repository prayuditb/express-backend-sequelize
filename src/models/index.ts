import { Sequelize, Model } from "sequelize";
import userFactory, { User } from "./user.model";
import * as config  from "../config"

export type DB = {
  sequelize: Sequelize
  User: any
  [key: string]: any
}
const temp: {[key: string]: any} = config
const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(temp[env].database, temp[env].username, temp[env].passowrd, temp[env])
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