import * as Sequelize from "sequelize"
import { DB } from "./index"

export class UserRole extends Sequelize.Model {
  id?: number
  role_id: number
  user_id: number

  static associate(db: DB) {
    db.UserRole.belongsTo(db.User)
    db.UserRole.belongsTo(db.Role)
  }

}

export default (sequelize: Sequelize.Sequelize) => {
  UserRole.init({
    role_id: { type: Sequelize.DataTypes.INTEGER, field: "role_id" },
    user_id: { type: Sequelize.DataTypes.INTEGER, field: "user_id" }
  }, {
    sequelize,
    timestamps: false,
    tableName: "user_roles"
  })
   return UserRole
}