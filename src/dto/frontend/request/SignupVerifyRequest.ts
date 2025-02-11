interface SignupVerifyRequestParams {
  token: string
}
export default class SignupVerifyRequest {
  public token: string
  constructor(params: SignupVerifyRequestParams) {
    this.token = params.token
  }
}
