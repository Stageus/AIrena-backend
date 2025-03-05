import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

interface NicknameChangeRequestParams {
  nickname: string
}

export default class NicknameChangeRequest {
  public nickname: string

  constructor(params: NicknameChangeRequestParams) {
    if (!new RegExp(Regex.NICKNAME).test(params.nickname)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.nickname = params.nickname
  }
}
