interface ResponseObject {
  status_code: number
  message: string
  pagination?: {
    page: number
    perpage: number
    total_pages: number
  }
  data: Object[]
}