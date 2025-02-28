export default class Regex {
  public static id = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{5,16}$/
  public static email = /^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  public static nickname = /^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z0-9]{2,12}$/
  public static title = /^[가-힣a-zA-Z0-9]{2,50}$/
  public static description = /^[가-힣a-zA-Z0-9]{2,500}$/
  public static subject = /^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z0-9]{2,50}$/
  public static quizCount = /^(10|[1-9])$/
  public static content = /^[가-힣a-zA-Z0-9]{2,500}$/
  public static textAnswer =
    /^[가-힣a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{1,100}$/
  public static search = /^[가-힣a-zA-Z0-9]{2,100}$/
  public static file =
    /^(?:[^\s]+\.jpg|[^\s]+\.png)(,(?:[^\s]+\.jpg|[^\s]+\.png)){0,4}$/
  public static password =
    /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{8,16}$/
}
