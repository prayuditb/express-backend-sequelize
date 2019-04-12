import express from "express"
import compression from "compression"
import bodyParser from "body-parser"
import expressValidator from "express-validator"
import localeMiddleware from "./middlewares/locale.middleware"

import userRoute from "./routes/user.route"
import authRoute from "./routes/auth.route"

// config
const app = express()
app.set("port", process.env.PORT || 3000)
app.set("env", process.env.NODE_ENV || "development")

// middlewares
app.use(localeMiddleware())
app.use(compression())
app.use(expressValidator())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use("/user", userRoute)
app.use("/auth", authRoute)

export default app
