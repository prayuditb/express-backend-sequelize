import { Request } from "express"
import jwt, { JsonWebTokenError, verify } from "jsonwebtoken"
import { FindOptions } from "sequelize/types"
import bcrypt from "bcrypt-nodejs"
import Controller from "./base.controller"
import db from "../models"
import PayloadBuilder from "../utils/payload-builder.utils"
import emailObserver, { FORGOT_PASSWORD, VERIFY_EMAIL } from "../utils/email-observer.utils"
import locale from "i18n"

class AuthController extends Controller implements Observable {
  observers: Observer[] = []
  constructor() {
    super(db.User, ["password", "forgot_password"])
  }

  // add observer instance
  registerObserver(observer: Observer) {
    this.observers.push(observer)
  }

  // remove observer instance
  removeObserver(observer: Observer): number {
    const idx = this.observers.indexOf(observer)
    if (idx >= 0) {
      this.observers.splice(idx, 1)
    }
    return idx
  }

  // trigger observer to take action
  notifyObserver(payload: Payload) {
    this.observers.forEach((observer: Observer) => observer.update(payload))
  }

  // login with email route: /auth/login-email
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

  // register with email. route: auth/register-email
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
      delete result.data[0].password
      result.data = [{ ...result.data[0], access_token: token}]

      // prepare payload to send email using builder pattern
      const payload = new PayloadBuilder().setEmail(sign.email)
        .setSubject(locale.__("Please verify your email address"))
        .setName(`${sign.first_name} ${sign.last_name}`)
        .setType(VERIFY_EMAIL)
        .setDynamicTemplate({
          salutation: "Hello",
          receiver_name: sign.first_name,
          message: locale.__("register welcome email"),
          button_label: locale.__("Verify Email"),
          button_url: `${process.env.BASE_URL}/v1/auth/verify-email?token=${token}`,
        })
        .build()

      this.notifyObserver(payload)
      return Promise.resolve(result)
    } catch (err) {
      return this.catchResponse(err)
    }
  }

  // route: auth/refresh-token
  // entend expirity time token
  async refreshToken(req: Request) {
    try {
      const authHeader = req.header("Authorization") || ""
      const res: ResponseObject = {
        status_code: 401, message: "Unauthenticated",
        data: [], dev_message: "Authorization header is required",
      }
      const token: string = authHeader.split(" ")[1];
      const decoded: object | string = jwt.verify(token, process.env.SECRET)
      const newtoken = jwt.sign(decoded, process.env.SECRET, { expiresIn: "30d" })
      res.status_code = 200
      res.message = locale.__("Success")
      res.dev_message = "success"
      res.data = [{ access_token: newtoken }]
      return Promise.resolve(res)
    } catch (err) {
      return this.catchResponse(err)
    }
  }

  // route: auth/forgot-password
  // will send a link to reset password to email
  async forgotPassword(req: Request) {
    try {
      const res: ResponseObject = {
        status_code: 404, data: [],
        message: locale.__("User not found"), dev_message: "not found",
      }
      const email = req.body.email
      const users: any[] = await this.model.findAll({
        where: { email }
      })
      if (users.length <= 0) {
        throw res
      }
      const token = jwt.sign({ email, full_name: `${users[0].first_name} ${users[0].last_name}` }, process.env.SECRET, { expiresIn: "1hr" })
      const payload = new PayloadBuilder().setEmail(email)
        .setName(`${users[0].first_name} ${users[0].last_name}`)
        .setSubject("Reset your password")
        .setDynamicTemplate({
          url: `${process.env.BASE_URL}/v1/auth/reset-passoword?token=${token}`,
          button_label: "Reset Password", // TODO: add locale
          message: "reset your password by clicking button be low", // TODO: add locale and provide a nice words
          full_name: `${users[0].first_name} ${users[0].last_name}`
        })
        .setType(FORGOT_PASSWORD)
        .build()
      this.notifyObserver(payload)
      res.status_code = 200
      res.message = "A link to reset your password has sent to your email" // TODO: add locale
      res.dev_message = "success"
      return Promise.resolve(res)
    } catch (err) {
      return this.catchResponse(err)
    }
  }

  // verify token that sent to email before access reset password
  // route: auth/forgot-password-verify
   async forgotPasswordVerifyToken(req: Request) {
    try {

    } catch (err) {
      return this.catchResponse(err)
    }
  }

  // reset password user. route: auth/reset-password
   async resetPassword(req: Request) {
    try {

    } catch (err) {
      return this.catchResponse(err)
    }
  }

}

const authController = new AuthController()
authController.registerObserver(emailObserver)

export default authController