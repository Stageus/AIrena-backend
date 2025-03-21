import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

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

  constructor(params: SignupRequestParams) {
    if (
      !Regex.ID.test(params.id) ||
      !Regex.PASSWORD.test(params.password) ||
      !Regex.PASSWORD.test(params.passwordCheck) ||
      !Regex.EMAIL.test(params.email)
    ) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.id = params.id
    this.password = params.password
    this.passwordCheck = params.passwordCheck
    this.email = params.email
  }
}
