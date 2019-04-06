import Controller from "./base.controller"
import db from "../models"

class UserController extends Controller {
  constructor() {
    super(db.User)
  }
}

export default new UserController()