import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

interface FilteredRankListRequestParams {
  tier: string
  current: number
  nickname: string
}

export default class FilteredRankListRequest {
  public tier: string
  public current: number
  public nickname: string
  constructor(params: FilteredRankListRequestParams) {
    if (params.tier && !new RegExp(Regex.TIER).test(params.tier)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (!params.tier) {
      this.tier = '%'
    } else {
      this.tier = params.tier
    }

    if (!params.current) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.current = Number(params.current)

    if (params.nickname && params.nickname.length > 100) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (!params.nickname) {
      this.nickname = '%'
    } else {
      this.nickname = params.nickname
    }
  }
}
