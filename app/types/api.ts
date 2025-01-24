export type APISuccessResponse = {
  pagination: APIPagination
  results: Array
}

export type APIPagination = {
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
  hasNextPage: bool
  hasPreviousPage: bool
  nextPage: number | null
  previousPage: number | null
}

export type APIErrorResponse = {
  error: APIErrorDetail
}

export type APIErrorDetail = {
  errorCode: string
  message: string
}

export type DeleteUserResponse = {
  status: boolean
  data?: {
    body: string
  }
  error?: APIErrorDetail
}
