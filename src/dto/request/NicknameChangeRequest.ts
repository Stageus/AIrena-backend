interface NicknameChangeRequestParams {
  id: string
  nickname: string
}

export default class NicknameChangeRequest {
  public id: string
  public nickname: string

  constructor(params: NicknameChangeRequestParams) {
    this.id = params.id
    this.nickname = params.nickname
  }
}
