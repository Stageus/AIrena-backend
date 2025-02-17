export default class FindIdResponse {
  public email: string
  public id: string

  constructor(email: string, id: string) {
    this.email = email
    this.id = id
  }
}
