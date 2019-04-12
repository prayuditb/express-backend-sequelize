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