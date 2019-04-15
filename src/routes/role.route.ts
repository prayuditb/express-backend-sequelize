import express, { Request, Response } from "express"
import { check, oneOf } from "express-validator/check"
import roleController from "../controllers/role.controller"
import validationHandler from "../middlewares/validation-handler.middleware"

const router = express.Router()

const bodyValidations = [
  check("name").isLength({ min: 3, max: 14 }),
  check("description").isLength({ min: 3, max: 14 }),
]

/**
 * @api {get} /role Get list of role
 * @apiVersion 1.0.0
 * @apiName GetRole
 * @apiGroup Role
 * @apiDescription Get list of availeble role
 * @apiParam page {Number} number
 * @apiParam perpage {Number} number
 * @apiParam relations {String} comma sparated model name. use to retrieve data along with relation. 
 * available relation: user_roles
 * @apiParam where {String} get data with where condition. currently only support `where = where_value`
 * @apiParam where_value {String} value for where condition
 * @apiParam order_by {String} field name for sort functionality
 * @apiParam desc {Boolean} descending sort
 * @apiParamExample Request-Example:
 * GET: http://<base_url>/v1/role/1?page=2&perpage=50&order_by=name
 */
router.get("/", (req: Request, res: Response) => {
  roleController.index(req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

/**
 * @api {get} /role/:id Get a role detail
 * @apiVersion 1.0.0
 * @apiName FindRole
 * @apiGroup Role
 * @apiParam {Number} id Role Id
 * @apiParamExample Request-Example:
 * GET: http://<base_url>/v1/role/1
 */
router.get("/:id", check("id").isInt().toInt(), validationHandler(), (req: Request, res: Response) => {
  const id = req.params.id
  roleController.find(id, req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

/**
 * @api {post} /role Create a new role
 * @apiVersion 1.0.0
 * @apiName CreateRole
 * @apiGroup Role
 * @apiParam {String} name name of role
 * @apiParam {String} description description of role
 * @apiParamExample {json} Request-Example:
 * {
 *  "name": "customer",
 *  "decription": "a customer"
 * }
 */
router.post("/", bodyValidations, validationHandler(), (req: Request, res: Response) => {
  roleController.store(req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})


/**
 * @api {put} /role Update a role
 * @apiVersion 1.0.0
 * @apiName UpdateRole
 * @apiGroup Role
 * @apiParam {Number} id id of role
 * @apiParam {String} name name of role
 * @apiParam {String} description description of role
 * @apiParamExample {json} Request-Example:
 *  PUT: http://<base_url>/v1/role/2
 * {
 *  "name": "customer",
 *  "decription": "a customer"
 * }
 */
router.put("/:id", oneOf(bodyValidations), validationHandler(), (req: Request, res: Response) => {
  const id = req.params.id
  roleController.update(id, req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

/**
 * @api {delete} /role/:id Delete a role
 * @apiVersion 1.0.0
 * @apiName DeleteRole
 * @apiGroup Role
 * @apiParamExample Request-Example:
 * DELETE: http://<base_url>/v1/role/1
 */
router.delete("/:id", check("id").isInt().toInt(), validationHandler(), (req: Request, res: Response) => {
  const id = req.params.id
  roleController.destroy(id).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

export default router