import express, { Request, Response } from "express"
import compression from "compression"
import bodyParser from "body-parser"
import expressValidator from "express-validator"
import localeMiddleware from "./middlewares/locale.middleware"
import authMiddleware from "./middlewares/auth.middleware"
import notfoundMiddleware from "./middlewares/notfound.middleware"

import userRoute from "./routes/user.route"
import authRoute from "./routes/auth.route"
import roleRoute from "./routes/role.route"

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
app.get("/docs", (req: Request, res: Response) => res.sendFile(`${__dirname}/../public/index.html`))
app.use("/v1/user", authMiddleware(), userRoute)
app.use("/v1/role", authMiddleware(), userRoute)
app.use("/v1/auth", authRoute)

// place this route at the last route for handling invalid routes
app.use("*", notfoundMiddleware())

export default app
