import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'
const regex = new Regex()
interface FindPasswordRequestParams {
  id: string
  email: string
}

export default class FindPasswordRequest {
  public id: string
  public email: string

  constructor(params: FindPasswordRequestParams) {
    this.id = params.id
    this.email = params.email
    if (!RegExp(regex.id, this.id) || !RegExp(regex.email, this.email)) {
    }
    throw ErrorRegistry.INVALID_INPUT_FORMAT
  }
}
