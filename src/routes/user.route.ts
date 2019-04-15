import express, { Request, Response } from "express"
import { checkSchema, check, oneOf, validationResult } from "express-validator/check"
import userController from "../controllers/user.controller"
import validationHandler from "../middlewares/validation-handler.middleware"

const router = express.Router()

const bodyValidations = [
  check("email").isEmail().trim(),
  check("password").isEmail().trim(),
  check("phone_number").isLength({ min: 8, max: 14 }),
  check("first_name").trim(),
  check("last_name").trim(),
  check("gender").isIn(["male", "female"]),
  check("birth_date").isISO8601(),
]
/**
 * @api {get} /user Get list of user
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup User
 * @apiDescription Get list of availeble user
 * @apiParam page {Number} number
 * @apiParam perpage {Number} number
 * @apiParam relations {String} comma sparated model name. use to retrieve data along with relation. 
 * available relation: user_users
 * @apiParam where {String} get data with where condition. currently only support `where = where_value`
 * @apiParam where_value {String} value for where condition
 * @apiParam order_by {String} field name for sort functionality
 * @apiParam desc {Boolean} descending sort
 * @apiParamExample Request-Example:
 * GET: http://<base_url>/v1/user/1?page=2&perpage=50&order_by=name
 */
router.get("/", (req: Request, res: Response) => {
  userController.index(req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

/**
 * @api {get} /user/:id Get a user detail
 * @apiVersion 1.0.0
 * @apiName FindUser
 * @apiGroup User
 * @apiParam {Number} id User Id
 * @apiParam relations {String} comma sparated model name. use to retrieve data along with relation. 
 * available relation: user_users
 * @apiParamExample Request-Example:
 * GET: http://<base_url>/v1/user/1?relations=user_users
 */
router.get("/:id", check("id").isInt().toInt(), validationHandler(), (req: Request, res: Response) => {
  const id = req.params.id
  userController.find(id, req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

/**
 * @api {post} /user Create a new user
 * @apiVersion 1.0.0
 * @apiName CreateUser
 * @apiGroup User
 * @apiParam {String} email user email (unique)
 * @apiParam {String} password user password
 * @apiParam {String} phone_number user phone number (unique)
 * @apiParam {String} first_name user first name
 * @apiParam {String} last_name user last name
 * @apiParam {String} gender one of `male` or `female`
 * @apiParam {String} birth_date user date of birth (string with date format)
 * @apiParamExample {json} Request-Example:
 * {
 *  "email": "john.doe@gmail.com",
 *	"password": "bayoe1234",
 *	"first_name": "prayudi",
 *	"last_name": "tirta bayu",
 *	"phone_number": "082218730799",
 *	"gender": "male",
 *	"birth_date": "1995-03-07",
 * }
 */
router.post("/", bodyValidations, validationHandler(), (req: Request, res: Response) => {
  userController.store(req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

/**
 * @api {put} /user/:id Update a new user
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup User
 * @apiParam {Number} id user id
 * @apiParam {String} email user email (unique)
 * @apiParam {String} password user password
 * @apiParam {String} phone_number user phone number (unique)
 * @apiParam {String} first_name user first name
 * @apiParam {String} last_name user last name
 * @apiParam {String} gender one of `male` or `female`
 * @apiParam {String} birth_date user date of birth (string with date format)
 * @apiParamExample {json} Request-Example:
 * {
 *  "email": "john.doe@gmail.com",
 *	"password": "bayoe1234",
 *	"first_name": "prayudi",
 *	"last_name": "tirta bayu",
 *	"phone_number": "082218730799",
 *	"gender": "male",
 *	"birth_date": "1995-03-07",
 * }
 */
router.put("/:id", oneOf(bodyValidations), validationHandler(), (req: Request, res: Response) => {
  const id = req.params.id
  userController.update(id, req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

/**
 * @api {delete} /user/:id Delete a user
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup User
 * @apiParamExample Request-Example:
 * DELETE: http://<base_url>/v1/user/1
 */
router.delete("/:id", check("id").isInt().toInt(), validationHandler(), (req: Request, res: Response) => {
  const id = req.params.id
  userController.destroy(id).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

export default router