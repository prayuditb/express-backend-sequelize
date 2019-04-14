import { Request, Response } from "express";
import locale from "i18n"

export default () => (req: Request, res: Response) => {
  res.status(404).json({ message: locale.__("Route not found"), dev_message: "route not found", status_code: 404 })
}