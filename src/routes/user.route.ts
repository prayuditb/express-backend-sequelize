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

router.get("/", (req: Request, res: Response) => {
  userController.index(req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  }).catch((err) => { // err is instance of ResponseObject
    res.status(err.status_code).json(err)
  })
})

router.get("/:id", check("id").isInt().toInt(), validationHandler(), (req: Request, res: Response) => {
  const id = req.params.id
  userController.find(id, req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  }).catch((err) => { // err is instance of ResponseObject
    res.status(err.status_code).json(err)
  })
})

router.post("/", bodyValidations, validationHandler(), (req: Request, res: Response) => {
  userController.store(req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  }).catch((err) => { // err is instance of ResponseObject
    res.status(err.status_code).json(err)
  })
})

router.put("/:id", oneOf(bodyValidations), validationHandler(), (req: Request, res: Response) => {
  const id = req.params.id
  userController.update(id, req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  }).catch((err) => { // err is instance of ResponseObject
    res.status(err.status_code).json(err)
  })
})

router.delete("/:id", check("id").isInt().toInt(), validationHandler(), (req: Request, res: Response) => {
  const id = req.params.id
  userController.destroy(id).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  }).catch((err) => { // err is instance of ResponseObject
    res.status(err.status_code).json(err)
  })
})

export default router