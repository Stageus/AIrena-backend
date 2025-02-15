interface SendFindPasswordEmailRequestParams {
  id: string
  email: string
}

export default class SendFindPasswordEmailRequest {
  public id: string
  public email: string

  constructor(parms: SendFindPasswordEmailRequestParams) {
    this.id = parms.id
    this.email = parms.email
  }
}
