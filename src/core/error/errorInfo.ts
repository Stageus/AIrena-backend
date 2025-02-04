import CustomError from '#error/customError'

export default class ErrorInfo {
  status: number
  code: string
  message: string

  constructor(customError: CustomError) {
    this.status = customError.status
    this.code = customError.code
    this.message = customError.message
  }
}
