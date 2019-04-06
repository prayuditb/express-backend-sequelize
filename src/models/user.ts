import * as Sequelize from "sequelize"

export class User extends Sequelize.Model {
  id?: number
  email!: string
  firstName!: string
  lastName!: string
  password!: string
  gender: string
  phoneNumber: string
  birthDate: string
  googleId: string
  forgotPassword: string
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export default (sequelize: Sequelize.Sequelize) => {
  User.init({
    email: { type: Sequelize.DataTypes.STRING, unique: true },
    phoneNumber: { type: Sequelize.DataTypes.STRING, unique: true },
    firstName: { type: Sequelize.DataTypes.STRING },
    lastName: { type: Sequelize.DataTypes.STRING },
    password: { type: Sequelize.DataTypes.STRING },
    gender: { type: Sequelize.DataTypes.STRING },
    birthDate: { type: Sequelize.DataTypes.DATE },
    forgotPassword: { type: Sequelize.DataTypes.STRING },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: "users"
  })
   return User
}