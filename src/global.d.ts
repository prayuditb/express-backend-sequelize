interface ResponseObject {
  status_code: number
  message: string
  dev_message: string
  query?: {
    where?: string
    where_value?: string
    order_by?: string
    desc?: boolean
    group_by?: string
  }
  pagination?: {
    page: number
    perpage: number
    total_pages: number
  }
  data: any[],
  errors?: Object[]
}

interface Observer {
  update(payload: Payload): void
}

interface Observable {
  observers: Observer[] 
  registerObserver(observer: Observer) : void
  removeObserver(observer: Observer): number
  notifyObserver(payload: Payload): void
}

declare type Payload = {
  user_id?: number
  email?: string
  subject?: string
  name?: string
  phone_number?: string
  message?: string
  type?: string
  dynamic_template?: {
    [key: string]: any
  }
  [key: string]: any
}