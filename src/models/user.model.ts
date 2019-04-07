import * as Sequelize from "sequelize"

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
}

export default (sequelize: Sequelize.Sequelize) => {
  User.init({
    email: { type: Sequelize.DataTypes.STRING, unique: true },
    phone_number: { type: Sequelize.DataTypes.STRING, unique: true },
    first_name: { type: Sequelize.DataTypes.STRING },
    last_name: { type: Sequelize.DataTypes.STRING },
    password: { type: Sequelize.DataTypes.STRING },
    gender: { type: Sequelize.DataTypes.STRING },
    birth_date: { type: Sequelize.DataTypes.DATE },
    forgot_password: { type: Sequelize.DataTypes.STRING },
    created_at: { type: Sequelize.DataTypes.DATE },
    updated_at: { type: Sequelize.DataTypes.DATE },
    deleted_at: { type: Sequelize.DataTypes.DATE },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: "users"
  })
   return User
}