export default class Regex {
  public id = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{5,16}$/
  public email: any = /^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  nickname = /^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z0-9]{2,12}$/
  title = /^[가-힣a-zA-Z0-9]{2,50}$/
  description = /^[가-힣a-zA-Z0-9]{2,500}$/
  file = /^(?:[^\s]+\.jpg|[^\s]+\.png)(,(?:[^\s]+\.jpg|[^\s]+\.png)){0,4}$/
  subject = /^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z0-9]{2,50}$/
  quizCount = /^(10|[1-9])$/
  content = /^[가-힣a-zA-Z0-9]{2,500}$/
  textAnswer = /^[가-힣a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{1,100}$/
  search = /^[가-힣a-zA-Z0-9]{2,100}$/
  public password =
    /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{8,16}$/
}
