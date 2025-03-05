import ErrorRegistry from '#error/ErrorRegistry'

interface NormalLoginRequestParams {
  id: string
  password: string
}

export default class NormalLoginRequest {
  public id: string
  public password: string
  constructor(params: NormalLoginRequestParams) {
    if (
      !params.id ||
      !params.password ||
      params.id.length > 100 ||
      params.password.length > 100
    ) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }

    this.id = params.id
    this.password = params.password
  }
}
