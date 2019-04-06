import { Request } from "express"
import * as Sequelize from "sequelize/types"
import db from "../models"

class ModelClass extends Sequelize.Model {}

export default abstract class Controller {
  protected model: any

  constructor(model: any) {
    this.model = model
  }

  /**
   * query data entity with pagination
   * available params
   * page: number
   * perpage: number
   * relations: comma sparated model name (query including relation data)
   * where: field name
   * value: number or string
   */
  async index(req: Request): Promise<ResponseObject> {
    const page: number = req.query.page || 1
    const perpage: number = req.query.perpage || 20
    const relations: string = req.query.relations || ""
    const where: string = req.query.where || ""
    const value: string = req.query.value || ""
    const offset: number =  page * perpage

    const response: ResponseObject = {
      status_code: 200,
      message: "success",
      data: []
    }

    try {
      const count: number = await this.model.count()
      response.pagination = {
        page, perpage, total_pages: Math.ceil(count / perpage)
      }

      const options: Sequelize.FindOptions = {}
      if (relations !== "") {
        const relationModels = []
        const relationArray: string[] = relations.split(",")
        for (let idx = 0; idx < relationArray.length; idx += 1) {
          if (db[relationArray[idx]]) {
            response.status_code = 422
            response.message = `Relation "${relationArray[idx]}" not found`
            throw response
          }
          relationModels.push(db[relations[idx]])
        }
        options.include = relationModels
      }
      if (where !== "") {
        options.where = {
          [where]: value
        }
      }

      const result: any[] = await this.model.findAll(options)
      response.data = result
      return Promise.resolve(response)
    } catch (err) {
      if (err.status_code) {
        return Promise.reject(err)
      }
      return Promise.reject({
        status_code: 500,
        message: err.message || "Internal server error",
        data: [],
      })
    }
  }

  // create data into databse
  // async store(req: Request): Promise<ResponseObject>  {

  // }

  // // find spesific data by its id
  // async find(id: number): Promise<ResponseObject>{

  // }

  // // delete a specific data by its id
  // async destroy(id: number): Promise<ResponseObject> {

  // }

  // // update specific data by its id
  // async update(id: number, req: Request): Promise<ResponseObject> {

  // }
}

