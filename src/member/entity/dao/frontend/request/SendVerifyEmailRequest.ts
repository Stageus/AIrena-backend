interface SendVerifyEmailRequestParams {
  email: string
}

export default class SendVerifyEmailRequest {
  public email: string

  constructor(parms: SendVerifyEmailRequestParams) {
    this.email = parms.email
  }
}
