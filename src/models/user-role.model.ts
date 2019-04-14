import * as Sequelize from "sequelize"
import { DB } from "./index"

export class UserRole extends Sequelize.Model {
  id?: number
  role_id: number
  user_id: number

  // we need this relation aliases for easier query
  static relationAliases = ["role", "user"]
  static associate(db: DB) {
    db.UserRole.belongsTo(db.User, { as: "user" })
    db.UserRole.belongsTo(db.Role, { as: "role" })
  }

}

export default (sequelize: Sequelize.Sequelize) => {
  UserRole.init({
    role_id: { type: Sequelize.DataTypes.INTEGER, field: "role_id" },
    user_id: { type: Sequelize.DataTypes.INTEGER, field: "user_id" }
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
    tableName: "user_roles"
  })
   return UserRole
}