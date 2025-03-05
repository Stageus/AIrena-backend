import ErrorRegistry from '#error/ErrorRegistry'
interface FindPasswordRequestParams {
  id: string
  email: string
}

export default class FindPasswordRequest {
  public id: string
  public email: string

  constructor(params: FindPasswordRequestParams) {
    if (
      !params.id ||
      !params.email ||
      params.id.length > 100 ||
      params.email.length > 100
    ) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.id = params.id
    this.email = params.email
  }
}
