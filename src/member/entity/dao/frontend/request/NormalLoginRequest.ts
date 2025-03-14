import ErrorRegistry from '#error/ErrorRegistry'

interface NormalLoginRequestParams {
  id: string
  password: string
}

export default class NormalLoginRequest {
  public id: string
  public password: string
  constructor(params: NormalLoginRequestParams) {
    if (!params.id) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (params.id.length > 16) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.id = params.id

    if (!params.password) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (params.password.length > 16) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.password = params.password
  }
}
