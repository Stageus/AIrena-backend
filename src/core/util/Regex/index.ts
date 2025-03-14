export default class Regex {
  public static readonly ID = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{5,16}$/
  public static readonly PASSWORD =
    /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{8,16}$/

  public static readonly EMAIL =
    /^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,100}$/

  public static readonly NICKNAME = /^.{2,12}$/
  public static readonly SUBJECT = /^.{1,50}$/
  public static readonly TITLE = /^.{1,50}$/
  public static readonly DESCRIPTION = /^.{0,1000}$/
  public static readonly CONTENT = /^.{0,10000}$/
  public static readonly TIER = /^(DIAMOND|PLATINUM|GOLD|SILVER|BRONZE)$/
  public static readonly UUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
}
