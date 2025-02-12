interface FindPasswordResponseParams {
  password: string
}

export default class FindPasswordResponse {
  public password: string
  constructor(params: FindPasswordResponseParams) {
    this.password = params.password
  }
}
