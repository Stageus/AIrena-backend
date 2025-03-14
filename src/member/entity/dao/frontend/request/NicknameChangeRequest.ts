import ErrorRegistry from '#error/ErrorRegistry'

interface NicknameChangeRequestParams {
  nickname: string
}

export default class NicknameChangeRequest {
  public nickname: string

  constructor(params: NicknameChangeRequestParams) {
    if (params.nickname.length < 2 || params.nickname.length > 12) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.nickname = params.nickname
  }
}
