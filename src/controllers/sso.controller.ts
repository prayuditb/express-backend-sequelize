import { Request } from "express"
import jwt, { JsonWebTokenError, verify } from "jsonwebtoken"
import { FindOptions } from "sequelize/types"
import bcrypt from "bcrypt-nodejs"
import Controller from "./base.controller"
import db from "../models"
import PayloadBuilder from "../utils/payload-builder.utils"
import locale from "i18n"

// route: <base_url>/v1/sso/
class SSOController extends Controller implements Observable {
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

  // login with google. route: sso/google
   async loginGoogle(req: Request) {
    try {
      // TODO: add logic here and return Promise.resolve(res: ResponseObject)
    } catch (err) {
      return this.catchResponse(err)
    }
  }

  // login with phone number. route: sso/phone
   async loginPhoneNumber(req: Request) {
    try {
      // TODO: add logic + nofity sms observer here and return Promise.resolve(res: ResponseObject)
    } catch (err) {
      return this.catchResponse(err)
    }
  }

}

const ssoController = new SSOController()
// TODO: register phone number observer here
// ssoController.registerObserver(smsObserver)

export default ssoController