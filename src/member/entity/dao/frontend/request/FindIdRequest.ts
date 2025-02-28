import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'
const regex = new Regex()
interface FindIdRequestParams {
  email: string
}

export default class FindIdRequest {
  public email: string

  constructor(params: FindIdRequestParams) {
    this.email = params.email
    console.log(this.email)
    if (!new RegExp(regex.email).test(this.email as string)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
  }
}
;``
