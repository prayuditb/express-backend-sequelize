import * as Sequelize from "sequelize"
import { DB } from "./index"

export class User extends Sequelize.Model {
  id?: number
  email!: string
  first_name!: string
  last_name!: string
  password!: string
  gender: string
  phone_number: string
  birth_date: string
  forgot_password: string
  readonly created_at!: Date;
  readonly updated_at!: Date;
  readonly deleted_at!: Date;

  // we need this relation aliases for easier query
  static relationAliases = ["user_roles"]
  static associate(db: DB) {
    db.User.hasMany(db.UserRole, { as: "user_roles" })
  }
}

export default (sequelize: Sequelize.Sequelize) => {
  User.init({
    email: { field: "email", type: Sequelize.DataTypes.STRING, unique: { name: "email", msg: "email already exist" }},
    phone_number: { field: "phone_number", type: Sequelize.DataTypes.STRING, unique: { name: "phone_number", msg: "phone number already exist" }},
    first_name: { field: "first_name", type: Sequelize.DataTypes.STRING },
    last_name: { field: "last_name", type: Sequelize.DataTypes.STRING },
    password: { field: "password", type: Sequelize.DataTypes.STRING },
    gender: { field: "gender", type: Sequelize.DataTypes.STRING },
    birth_date: { field: "birth_date", type: Sequelize.DataTypes.DATE },
    forgot_password: { field: "forgot_password", type: Sequelize.DataTypes.STRING },
    created_at: { field: "created_at", type: Sequelize.DataTypes.DATE },
    updated_at: { field: "updated_at", type: Sequelize.DataTypes.DATE },
    deleted_at: { field: "deleted_at", type: Sequelize.DataTypes.DATE },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: "users"
  })
   return User
}