import express, { Request, Response } from "express"
import userController from "../controllers/user.controller"

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
  userController.index(req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  }).catch((err) => { // err is instance of ResponseObject
    res.status(err.status_code).json(err)
  })
})

router.get("/:id", (req: Request, res: Response) => {
  const id = req.query.id
  userController.find(id, req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  }).catch((err) => { // err is instance of ResponseObject
    res.status(err.status_code).json(err)
  })
})

router.post("/", (req: Request, res: Response) => {
  userController.store(req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  }).catch((err) => { // err is instance of ResponseObject
    res.status(err.status_code).json(err)
  })
})

router.put("/:id", (req: Request, res: Response) => {
  const id = req.query.id
  userController.update(id, req).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  }).catch((err) => { // err is instance of ResponseObject
    res.status(err.status_code).json(err)
  })
})

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.query.id
  userController.destroy(id).then((response: ResponseObject) => {
    res.status(response.status_code).json(response)
  }).catch((err) => { // err is instance of ResponseObject
    res.status(err.status_code).json(err)
  })
})

export default router