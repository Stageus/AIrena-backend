interface FindPasswordRequestParams {
  id: string
  email: string
}

export default class FindPasswordRequest {
  public id: string
  public email: string

  constructor(parms: FindPasswordRequestParams) {
    this.id = parms.id
    this.email = parms.email
  }
}
