interface SignupVerifyRequestParams {
  email: string
}

export default class SignupVerifyRequest {
  public email: string
  constructor(params: SignupVerifyRequestParams) {
    this.email = params.email
  }
}
