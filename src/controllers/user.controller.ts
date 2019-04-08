import Controller from "./base.controller"
import db from "../models"

class UserController extends Controller {
  constructor() {
    super(db.User, ["password"])
  }
}

export default new UserController()