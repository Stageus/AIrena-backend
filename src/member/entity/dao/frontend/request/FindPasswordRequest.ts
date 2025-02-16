interface FindPasswordRequestParams {
  id: string
  email: string
}

export default class FindPasswordRequest {
  public id: string
  public email: string

  constructor(params: FindPasswordRequestParams) {
    this.id = params.id
    this.email = params.email
  }
}
