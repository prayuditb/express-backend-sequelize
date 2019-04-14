import * as Sequelize from "sequelize"
import { DB } from "./index"

export class Role extends Sequelize.Model {
  id?: number
  name: string
  description: string

  static relationAliases = ["user_roles"]
  static associate(db: DB) {
    db.Role.hasMany(db.UserRole, { as: "user_roles" });
  }

}

export default (sequelize: Sequelize.Sequelize) => {
  Role.init({
    name: { field: "name", type: Sequelize.DataTypes.STRING },
    description: { field: "description", type: Sequelize.DataTypes.STRING },
  }, {
    sequelize,
    timestamps: false,
    tableName: "roles"
  })
   return Role
}