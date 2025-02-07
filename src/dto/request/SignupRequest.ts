interface SignupRequestParams {
  id: string
  password: string
  passwordCheck: string
  email: string
}

export default class SignupRequest {
  public id: string
  public password: string
  public passwordCheck: string
  public email: string

  constructor(parms: SignupRequestParams) {
    this.id = parms.id
    this.password = parms.password
    this.passwordCheck = parms.passwordCheck
    this.email = parms.email
  }
}
