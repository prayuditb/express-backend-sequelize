import express, { Request, Response } from "express"
import { checkSchema, check, oneOf, validationResult } from "express-validator/check"
import authController from "../controllers/auth.controller"
import validationHandler from "../middlewares/validation-handler.middleware"
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router()

/**
 * @api {post} /auth/login-email Login by email
 * @apiVersion 1.0.0
 * @apiName Login with email
 * @apiDescription Login with email
 * @apiGroup Auth
 * @apiParam {String} email user email
 * @apiParam {String} password md5 encrypted password
 * @apiParam {String} secret secret string to get access
 * @apiParamExample {json} Request-Example:
 * {
 * 	"email": "bayudesu23@gmail.com",
 * 	"password": "bayudesu",
 * 	"secret": "a430e06de5ce438d499c2e4063d60fd6"
 * }
 */
router.post("/login-email",
  check("email").isEmail().trim(),
  check("password").trim(),
  check("secret").trim(),
  validationHandler(),
  (req: Request, res: Response) => {
  authController.loginEmail(req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

/**
 * @api {post} /auth/register-email Register by email
 * @apiVersion 1.0.0
 * @apiName Register with email
 * @apiDescription Register with email
 * @apiGroup Auth
 * @apiParam {String} email user email
 * @apiParam {String} password md5 encrypted password
 * @apiParam {String} first_name firstname of user
 * @apiParam {String} last_name lastname of user
 * @apiParam {String} secret secret string to get access
 * @apiParamExample {json} Request-Example:
 * {
 *	"email": "bayudesu23@gmail.com",
 *	"password": "bayudesu",
 *	"first_name": "bayu",
 *	"last_name": "awesome",
 *	"secret": "a430e06de5ce438d499c2e4063d60fd6"
 * }
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

/**
 * @api {get} /auth/refreshh-token Refresh Token
 * @apiVersion 1.0.0
 * @apiName Refresh token
 * @apiDescription Extend expirity time of token and will
 * @apiGroup Auth
 * @apiHeader {String} Authorization token for authorization using format `Authorization: Bearer <your_token>`
 */
router.get("/refresh-token", authMiddleware(), (req: Request, res: Response) => {
  authController.refreshToken(req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  })
})

export default router