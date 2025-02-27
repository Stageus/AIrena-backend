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
    if (!RegExp(regex.email, this.email)) {
      throw ErrorRegistry.
    }
  }
}
;``
