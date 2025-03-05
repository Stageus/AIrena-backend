import ErrorRegistry from '#error/ErrorRegistry'
interface FindIdRequestParams {
  email: string
}

export default class FindIdRequest {
  public email: string

  constructor(params: FindIdRequestParams) {
    if (!params.email || params.email.length > 100) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.email = params.email
  }
}
;``
