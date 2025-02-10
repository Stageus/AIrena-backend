interface FindPasswordRequestParams {
  id: string
  email: string
  token: string
}

export default class FindPasswordRequest {
  public id: string
  public email: string
  public token: string

  constructor(params: FindPasswordRequestParams) {
    this.id = params.id
    this.email = params.email
    this.token = params.token
  }
}
