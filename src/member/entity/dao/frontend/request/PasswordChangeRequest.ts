import ErrorRegistry from '#error/ErrorRegistry'

interface PasswordChangeRequestParams {
  password: string
  passwordCheck: string
}
export default class PasswordChangeRequest {
  public password: string
  public passwordCheck: string

  constructor(params: PasswordChangeRequestParams) {
    this.password = params.password
    this.passwordCheck = params.passwordCheck
    if (this.password != this.passwordCheck) {
      throw ErrorRegistry.PASSWORD_NOT_EQUAL
    }
  }
}
