import { Request } from "express"
import * as Sequelize from "sequelize/types"
import db, { DB } from "../models"

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
   * where_value: number or string
   * order_by: field name
   * desc: boolean
   * group_by: field name
   */
  async index(req: Request): Promise<ResponseObject> {
    const page: number = req.query.page || 1
    const perpage: number = req.query.perpage || 20
    const relations: string = req.query.relations || ""
    const where: string = req.query.where || ""
    const whereValue: string = req.query.where_value || ""
    const offset: number =  (page - 1) * perpage
    const orderBy: string = req.query.order_by || ""
    const isDesc: boolean = req.query.desc == "true"
    const groupBy: string = req.query.group_by || ""

    const response: ResponseObject = {
      status_code: 200,
      message: "Success",
      dev_message: "success",
      data: [],
      query: {
        where,
        where_value: whereValue,
        desc: isDesc,
        order_by: orderBy,
        group_by: groupBy,
      }
    }

    try {
      const count: number = await this.model.count()
      response.pagination = {
        page, perpage, total_pages: Math.ceil(count / perpage)
      }

      const options: Sequelize.FindOptions = {
        offset,
        limit: perpage
      }

      // query with join relation
      if (relations !== "") {
        const relationModels: any[] | Error = this.getRelationModels(relations.split(","), db)
        if (relationModels instanceof Error) {
          response.status_code = 422
          response.dev_message = relationModels.message
          response.message = "Data Given is invalid"
          throw response
        }
        options.include = relationModels
      }

      // query with where clause
      if (where !== "") {
        options.where = {
          [where]: whereValue
        }
      }

      // query with order clause
      if (orderBy !== "") {
        const order: string[] = [orderBy]
        if (isDesc) { order.push("DESC") }
        options.order = order
      }

      // qeury with group by clause
      if (groupBy !== "") {
        options.group = groupBy
      }

      response.data = await this.model.findAll(options)
      return Promise.resolve(response)
    } catch (err) {
      return Promise.reject(this.catchResponse(err))
    }
  }

  // create data into databse
  async store(req: Request): Promise<ResponseObject>  {
    const response: ResponseObject = {
      status_code: 200,
      message: "Success",
      dev_message: "success",
      data: []
    }

    try {
      response.data = await this.model.create(req.body)
      return Promise.resolve(response)
    } catch (err) {
      return Promise.reject(this.catchResponse(err))
    }
  }

  // find spesific data by its id
  async find(id: number, req: Request): Promise<ResponseObject> {
    const relations: string = req.query.relation || ""
    const response: ResponseObject = {
      status_code: 200,
      message: "Success",
      dev_message: "success",
      data: []
    }

    try {
      const options: Sequelize.FindOptions = {
        where: { id }
      }

      // query with join relation
      if (relations !== "") {
        const relationModels: any[] | Error = this.getRelationModels(relations.split(","), db)
        if (relationModels instanceof Error) {
          response.status_code = 422
          response.dev_message = relationModels.message
          response.message = "Data given is invalid"
          throw response
        }
        options.include = relationModels
      }

      response.data = await this.model.findAll(options)
      return Promise.resolve(response)
    } catch (err) {
      return Promise.reject(this.catchResponse(err))
    }
  }

  // delete a specific data by its id
  async destroy(id: number): Promise<ResponseObject> {
    const response: ResponseObject = {
      status_code: 200,
      message: "Delete data successful",
      dev_message: "success",
      data: []
    }

    try {
      const options: Sequelize.FindOptions = {
        where: { id }
      }
      response.data = await this.model.findAll(options)
      await this.model.destroy(options)
      return Promise.resolve(response)
    } catch (err) {
      return Promise.reject(this.catchResponse(err))
    }
  }

   // update specific data by its id
  async update(id: number, req: Request): Promise<ResponseObject> {
    const response: ResponseObject = {
      status_code: 200,
      message: "Delete data successful",
      dev_message: "success",
      data: []
    }

    try {
      const options: Sequelize.FindOptions = {
        where: { id }
      }
      await this.model.update(req.body, options)
      response.data = await this.model.findAll(options)
      return Promise.resolve(response)
    } catch (err) {
      return Promise.reject(this.catchResponse(err))
    }
  }

  // error response adapter
  protected catchResponse(err: ResponseObject | Error): ResponseObject {
    const res: ResponseObject = {
      status_code: 500,
      message: "Something went wrong",
      dev_message: err.message || "Internal server error",
      data: [],
    }
    if (err instanceof Error) {
      return res
    }
    return err
  }

  // helper to convert array of model names to array of models
  protected getRelationModels(relations: string[], db: DB): any[] | Error {
    const relationModels = []
    for (let idx = 0; idx < relations.length; idx += 1) {
      if (db[relations[idx]]) {
        return new Error(`Relation "${relations[idx]}" not found`)
      }
      relationModels.push(db[relations[idx]])
    }
    return relationModels
  }

}
