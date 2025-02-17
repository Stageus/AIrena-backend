import ErrorRegistry from '#error/ErrorRegistry'

interface PasswordChangeRequestParams {
  password: string
  passwordCheck: string
  token: string
}
export default class PasswordChangeRequest {
  public password: string
  public passwordCheck: string
  public token: string

  constructor(params: PasswordChangeRequestParams) {
    this.password = params.password
    this.passwordCheck = params.passwordCheck
    this.token = params.token
    if (this.password != this.passwordCheck) {
      throw ErrorRegistry.PASSWORD_NOT_EQUAL
    }
  }
}
