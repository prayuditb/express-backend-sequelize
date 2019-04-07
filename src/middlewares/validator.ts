import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator/check"

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: any = validationResult(req)
    if (!errors.isEmpty()) {
      const response: ResponseObject = {
        status_code: 422,
        message: "Data sumitted is invalid",
        errors: errors.array(),
        dev_message: "Validation failed",
        data:[],
      }
      return res.status(response.status_code).json(response);
    }
    next()
  }
}