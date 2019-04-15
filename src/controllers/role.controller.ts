import Controller from "./base.controller"
import db from "../models"

class RoleController extends Controller {
  constructor() {
    super(db.Role)
  }
}

export default new RoleController()