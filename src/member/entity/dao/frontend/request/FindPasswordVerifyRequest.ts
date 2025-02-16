interface FindPasswordVerifyRequestParams {
  token: string
}
export default class FindPasswordVerifyRequest {
  public token: string
  constructor(params: FindPasswordVerifyRequestParams) {
    this.token = params.token
  }
}
