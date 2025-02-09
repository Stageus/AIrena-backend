interface FindPasswordRequestParams {
  id: string
  email: string
  token: string
}

export default class FindPasswordRequest {
  public id: string
  public email: string
  public token: string

  constructor(parms: FindPasswordRequestParams) {
    this.id = parms.id
    this.email = parms.email
    this.token = parms.token
  }
}
