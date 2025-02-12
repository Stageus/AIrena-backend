interface NormalLoginRequestParams {
  id: string
  password: string
}

export default class NormalLoginRequest {
  public id: string
  public password: string
  constructor(params: NormalLoginRequestParams) {
    this.id = params.id
    this.password = params.password
  }
}
