import { Request } from "express"
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { FindOptions } from "sequelize/types"
import bcrypt from "bcrypt-nodejs"
import Controller from "./base.controller"
import db from "../models"
import locale from "i18n"

class AuthController extends Controller {
  constructor() {
    super(db.User, ["password", "forgot_password"])
  }

  async loginEmail(req: Request) {
    const res: ResponseObject = {
      status_code: 200,
      message: locale.__("Success"),
      dev_message: "success",
      data: [],
    }

    try {
      const { email, password } = req.body

      const option: FindOptions = {
        where: { email }
      }
      const usersDb: any[] = await this.model.findAll(option)
      if (usersDb.length <= 0) {
        res.status_code = 401
        res.message = locale.__("User not found")
        res.dev_message = "unauthorized"
        throw res
      }

      if (!bcrypt.compareSync(password, usersDb[0].password)) {
        res.status_code = 401
        res.message = locale.__("Password is incorrect")
        res.dev_message = "unauthorized"
        throw res
      }
      const users = usersDb.map((user: any) => user.toJSON())
      const sign = {
        id: users[0].id,
        email: users[0].email,
        phone_number: users[0].phone_number,
        first_name: users[0].first_name,
        last_name: users[0].last_name,
      }
      const token = jwt.sign(sign, process.env.SECRET, { expiresIn: "30d" })
      delete users[0].password
      delete users[0].forgot_password
      res.data.push({ ...users[0], access_token: token })
      return Promise.resolve(res)
    } catch (err) {
      return this.catchResponse(err)
    }
  }

  async registerEmail(req: Request) {
    try {
      delete req.body.secret
      req.body.password = bcrypt.hashSync(req.body.password)
      const result = await this.store(req)
      if (result.status_code >= 400) {
        throw result;
      }
      const sign = {
        id: result.data[0].id,
        email: result.data[0].email,
        phone_number: result.data[0].phone_number,
        first_name: result.data[0].first_name,
        last_name: result.data[0].last_name,
      }
      const token = jwt.sign(sign, process.env.SECRET, { expiresIn: "30d" })
      result.data = [{ ...result.data[0], access_token: token}]
      return Promise.resolve(result)
    } catch (err) {
      return this.catchResponse(err)
    }
  }

  refreshToken(req: Request) {
    try {

    } catch (err) {
      return this.catchResponse(err)
    }
  }

  forgotPassword(req: Request) {
    try {

    } catch (err) {
      return this.catchResponse(err)
    }
  }

  resetPassword(req: Request) {
    try {

    } catch (err) {
      return this.catchResponse(err)
    }
  }

  loginGoogle(req: Request) {
    try {

    } catch (err) {
      return this.catchResponse(err)
    }
  }


}

export default new AuthController()