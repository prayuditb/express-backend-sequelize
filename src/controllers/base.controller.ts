import { Request } from "express"
import * as Sequelize from "sequelize/types"
import db, { DB } from "../models"
import locale from "i18n"

export default abstract class Controller {
  protected model: any
  protected exclude_fields: string[]

  constructor(model: any, excludes?: string[]) {
    this.model = model
    this.exclude_fields = excludes
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
      message: locale.__("Success"),
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

      const options: { [key: string]: any } = {
        offset,
        limit: perpage
      }

      if (this.exclude_fields) {
        options.attributes = { exclude: this.exclude_fields }
      }

      // query with join relation
      if (relations !== "") {
        this.model.relationAliases = this.model.relationAliases || []
        options.include = relations.split(",").map((relation: string) => {
          if (this.model.relationAliases.indexOf(relation) < 0) {
            response.status_code = 422
            response.dev_message = `some relation not found, avalilable relation are [${this.model.relationAliases.join(",")}]`
            response.message = locale.__("Find relation failed")
            throw response
          }
          return relation
        })
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
      return this.catchResponse(err)
    }
  }

  // create data into databse
  async store(req: Request): Promise<ResponseObject>  {
    const response: ResponseObject = {
      status_code: 200,
      message: locale.__("Success"),
      dev_message: "success",
      data: []
    }

    try {
      const result: any = await this.model.create(req.body)
      response.data =  [result.toJSON()]
      return Promise.resolve(response)
    } catch (err) {
      return this.catchResponse(err)
    }
  }

  // find spesific data by its id
  async find(id: number, req: Request): Promise<ResponseObject> {
    const relations: string = req.query.relations || ""
    const response: ResponseObject = {
      status_code: 200,
      message: locale.__("Success"),
      dev_message: "success",
      data: []
    }

    try {
      const options: { [key:string]: any } = {
        where: { id }
      }

      // exclude field
      if (this.exclude_fields) {
        options.attributes = { exclude: this.exclude_fields }
      }

      // query with join relation
      if (relations !== "") {
        this.model.relationAliases = this.model.relationAliases || []
        options.include = relations.split(",").map((relation: string) => {
          if (this.model.relationAliases.indexOf(relation) < 0) {
            response.status_code = 422
            response.dev_message = `some relation not found, avalilable relation are [${this.model.relationAliases.join(",")}]`
            response.message = locale.__("Find relation failed")
            throw response
          }
          return relation
        })
      }

      response.data = await this.model.findAll(options)
      return Promise.resolve(response)
    } catch (err) {
      return this.catchResponse(err)
    }
  }

  // delete a specific data by its id
  async destroy(id: number): Promise<ResponseObject> {
    const response: ResponseObject = {
      status_code: 200,
      message: locale.__("Delete data successful"),
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
      return this.catchResponse(err)
    }
  }

   // update specific data by its id
  async update(id: number, req: Request): Promise<ResponseObject> {
    const response: ResponseObject = {
      status_code: 200,
      message: locale.__("Update data successful"),
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
      return this.catchResponse(err)
    }
  }

  // error instance to response object adapter
  protected catchResponse(err: ResponseObject | Error): ResponseObject {
    const res: ResponseObject = {
      status_code: 500,
      message: locale.__("Oops, something went wrong"),
      dev_message: err.message || "internal server error",
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
        relationModels.push(db[relations[idx]])
      }
    }
    if (relationModels.length <= 0 ) {
      return new Error(`relation "${relations.join(",")}" not found`)
    }
    return relationModels
  }

}
