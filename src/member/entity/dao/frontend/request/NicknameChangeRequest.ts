interface NicknameChangeRequestParams {
  nickname: string
}

export default class NicknameChangeRequest {
  public nickname: string

  constructor(params: NicknameChangeRequestParams) {
    this.nickname = params.nickname
  }
}
