import ProfileResponse from '../entity/dao/frontend/response/ProfileResponse.js'
import MemberInfoRepository from '../repository/MemberInfoRepository.js'

export default class MeService {
  /** 로그아웃 */
  static async getProfile(memberIdx: number) {
    const result = await MemberInfoRepository.getProfile(memberIdx)
    return new ProfileResponse(result.nickname)
  }
}
