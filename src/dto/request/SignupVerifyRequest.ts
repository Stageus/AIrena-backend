interface SignupVerifyRequestParams {
  id: string
  password: string
  email: string
  token: string
}

export default class SignupVerifyRequest {
  public id: string
  public password: string
  public email: string
  public token: string
  constructor(params: SignupVerifyRequestParams) {
    this.id = params.id
    this.password = params.password
    this.email = params.email
    this.token = params.token
  }
}
