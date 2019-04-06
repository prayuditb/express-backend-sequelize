import express from "express"
import compression from "compression"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import passport from "passport"
import expressValidator from "express-validator"
import errorHandler from "errorhandler"

dotenv.config()
const app = express()

app.set("port", process.env.PORT || 3000)
app.set("env", process.env.NODE_ENV || "development")

if (process.env.NODE_ENV !== "production") {
  app.use(errorHandler)
}
app.use(compression())
app.use(expressValidator())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())

export default app
