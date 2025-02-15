interface LoginRequestParams {
  code: string // `code`는 선택적 속성
}

export default class LoginRequest {
  public code: string

  constructor(params: LoginRequestParams) {
    this.code = params.code
  }
}
