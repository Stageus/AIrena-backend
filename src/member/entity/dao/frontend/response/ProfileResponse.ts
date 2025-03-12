export default class ProfileResponse {
  public nickname: string
  public role: string
  public idx: number

  constructor(nickname: string, role: string, idx: number) {
    this.nickname = nickname
    this.role = role
    this.idx = idx
  }
}
