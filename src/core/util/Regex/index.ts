export default class Regex {
  public static readonly ID = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{5,16}$/
  public static readonly PASSWORD =
    /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{8,16}$/
  public static readonly EMAIL =
    /^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,100}$/
  public static readonly QUIZ_COUNT = /^(10|[1-9])$/
  public static readonly TIER = /^(DIAMOND|PLATINUM|GOLD|SILVER|BRONZE)$/
  public static readonly UUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
}
