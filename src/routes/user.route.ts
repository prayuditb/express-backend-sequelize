import express, { Request, Response } from "express"
import { checkSchema, check, oneOf, validationResult } from "express-validator/check"
import userController from "../controllers/user.controller"
import validationHandler from "../middlewares/validator"

const router = express.Router()

const bodyValidations = [
  check("email").isEmail().trim(),
  check("phone_number").isLength({ min: 8, max: 14 }),
  check("first_name").trim(),
  check("last_name").trim(),
  check("gender").isIn(["male", "female"]),
  check("birth_date").isISO8601(),
]
/**
 * @api {get} /user/:id Get User information
 * @apiVersion 1.0.0
 * @apiName Get
 * @apiGroup User
 * @apiParam {Number} id Users unique ID.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
router.get("/", (req: Request, res: Response) => {
  userController.index(req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

router.get("/:id", check("id").isInt().toInt(), validationHandler(), (req: Request, res: Response) => {
  const id = req.params.id
  userController.find(id, req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

router.post("/", bodyValidations, validationHandler(), (req: Request, res: Response) => {
  userController.store(req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

router.put("/:id", oneOf(bodyValidations), validationHandler(), (req: Request, res: Response) => {
  const id = req.params.id
  userController.update(id, req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

router.delete("/:id", check("id").isInt().toInt(), validationHandler(), (req: Request, res: Response) => {
  const id = req.params.id
  userController.destroy(id).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

export default router