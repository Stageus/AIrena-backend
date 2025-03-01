export default class Regex {
  public static readonly ID = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{5,16}$/
  public static readonly EMAIL =
    /^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  public static readonly NICKNAME =
    /^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z0-9]{2,12}$/
  public static readonly TITLE = /^[가-힣a-zA-Z0-9]{2,50}$/
  public static readonly DESCRIPTION = /^[가-힣a-zA-Z0-9]{2,500}$/
  public static SUBJECT = /^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z0-9]{2,50}$/
  public static QUIZ_COUNT = /^(10|[1-9])$/
  public static CONTENT = /^[가-힣a-zA-Z0-9]{2,500}$/
  public static TEXT_ANSWER =
    /^[가-힣a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{1,100}$/
  public static readonly SEARCH = /^[가-힣a-zA-Z0-9]{2,100}$/
  public static readonly TIER = /^(DIAMOND|PLATINUM|GOLD|SILVER|BRONZE)$/
  public static readonly FILE =
    /^(?:[^\s]+\.jpg|[^\s]+\.png)(,(?:[^\s]+\.jpg|[^\s]+\.png)){0,4}$/
  public static readonly PASSWORD =
    /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{8,16}$/
  public static readonly UUID =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
}
