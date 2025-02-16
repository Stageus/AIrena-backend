interface SendVerifyEmailRequestParams {
  id: string
  email: string
}

export default class SendVerifyEmailRequest {
  public id: string
  public email: string

  constructor(parms: SendVerifyEmailRequestParams) {
    this.id = parms.id
    this.email = parms.email
  }
}
