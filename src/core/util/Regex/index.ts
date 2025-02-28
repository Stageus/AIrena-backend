export default class Regex {
  public id = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{5,16}$/
  public email = /^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  public nickname = /^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z0-9]{2,12}$/
  public title = /^[가-힣a-zA-Z0-9]{2,50}$/
  public description = /^[가-힣a-zA-Z0-9]{2,500}$/
  public subject = /^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z0-9]{2,50}$/
  public quizCount = /^(10|[1-9])$/
  public content = /^[가-힣a-zA-Z0-9]{2,500}$/
  public textAnswer = /^[가-힣a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{1,100}$/
  public search = /^[가-힣a-zA-Z0-9]{2,100}$/
  public file =
    /^(?:[^\s]+\.jpg|[^\s]+\.png)(,(?:[^\s]+\.jpg|[^\s]+\.png)){0,4}$/
  public password =
    /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{8,16}$/
}
