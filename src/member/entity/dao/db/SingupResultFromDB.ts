export default interface SignupResultFromDB {
  idx: number
  email: string
  role: 'NORMAL' | 'ADMIN'
}
