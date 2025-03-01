import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

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
    if (!new RegExp(Regex.PASSWORD).test(params.password)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (params.password != params.passwordCheck) {
      throw ErrorRegistry.PASSWORD_NOT_EQUAL
    }
    this.password = params.password
    this.passwordCheck = params.passwordCheck
    this.token = params.token
  }
}
