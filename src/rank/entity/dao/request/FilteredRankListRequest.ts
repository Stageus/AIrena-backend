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
    if (
      !new RegExp(Regex.tier).test(params.tier) ||
      !new RegExp(Regex.nickname).test(params.nickname)
    ) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.tier = params.tier
    this.current = Number(params.current)
    this.nickname = params.nickname
  }
}
