import { Request, Response, NextFunction } from "express"
import i18n from "i18n"
import path from "path"

i18n.configure({
  locales: ["en", "id"],
  defaultLocale: "id",
  queryParameter: "lang",
  extension: ".json",
  directory: path.join("./", "src/locales/")
});

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const lang: string = req.header("Accept-Language") || "en"
    if (i18n.getLocales().indexOf(lang) >= 0) {
      i18n.setLocale(lang)
    }
    next()
  }
}