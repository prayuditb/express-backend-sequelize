import express from "express"
import compression from "compression"
import bodyParser from "body-parser"
import passport from "passport"
import expressValidator from "express-validator"
import errorHandler from "errorhandler"

import userRoute from "./routes/user.route"

// config
const app = express()
app.set("port", process.env.PORT || 3000)
app.set("env", process.env.NODE_ENV || "development")

// middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(errorHandler)
}
app.use(compression())
app.use(expressValidator())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())

// routes
app.use("/user", userRoute)

export default app
