interface FindIdRequestParams {
  email: string
}

export default class FindIdRequest {
  public email: string

  constructor(params: FindIdRequestParams) {
    this.email = params.email
  }
}
