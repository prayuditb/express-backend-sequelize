interface ResponseObject {
  status_code: number
  message: string
  dev_message: string
  pagination?: {
    page: number
    perpage: number
    total_pages: number
  }
  data: Object[]
}