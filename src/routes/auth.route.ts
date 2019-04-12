import express, { Request, Response } from "express"
import { checkSchema, check, oneOf, validationResult } from "express-validator/check"
import authController from "../controllers/auth.controller"
import validationHandler from "../middlewares/validation-handler.middleware"

const router = express.Router()

/**
 * @api {post} auth/login-email
 * @apiVersion 1.0.0
 * @apiName Login with email
 * @apiGroup Auth
 * @apiParam {String} email user email
 * @apiParam {String} password md5 encrypted password
 */
router.post("/login-email",
  check("email").isEmail().trim(),
  check("password").trim(),
  validationHandler(),
  (req: Request, res: Response) => {
  authController.loginEmail(req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

/**
 * @api {post} auth/login-email
 * @apiVersion 1.0.0
 * @apiName Login with email
 * @apiGroup Auth
 * @apiParam {String} email user email
 * @apiParam {String} password md5 encrypted password
 * @apiParam {String} first_name firstname of user
 * @apiParam {String} last_name lastname of user
 * @apiParam {String} secret secret string to get access
 */
router.post("/register-email",
  check("email").isEmail().trim(),
  check("password").trim(),
  check("first_name").trim(),
  check("last_name").trim(),
  check("secret").trim(),
  validationHandler(),
  (req: Request, res: Response) => {
  authController.registerEmail(req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

export default router