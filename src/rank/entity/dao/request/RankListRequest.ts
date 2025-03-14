import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

interface RankListRequestParams {
  tier: string
  current: number
  nickname: string
}

export default class RankListRequest {
  public tier: string
  public current: number
  public nickname: string
  constructor(params: RankListRequestParams) {
    if (!params.current) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.current = Number(params.current)

    if (params.tier && !Regex.TIER.test(params.tier)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.tier = params.tier

    if (params.nickname && params.nickname.length > 12) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.nickname = params.nickname
  }
}
