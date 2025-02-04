import CustomError from './customError.js'

export default class ErrorRegistry {
  // Global(GL)
  static readonly INTERNAL_SERVER_ERROR = new CustomError(
    500,
    'GL001',
    '서버 오류가 발생했습니다',
  )
  static readonly INVALID_INPUT_FORMAT = new CustomError(
    400,
    'GL002',
    '입력 형식이 올바르지 않습니다',
  )

  // User(US)
  static readonly CAN_NOT_FIND_USER = new CustomError(
    404,
    'US001',
    '사용자 정보가 존재하지 않습니다',
  )

  static readonly INVALID_USER = new CustomError(
    401,
    'US002',
    '접근 권한이 없습니다.',
  )

  // Mock Test(MO)
  static readonly CAN_NOT_FIND_TEST = new CustomError(
    404,
    'MO001',
    '모의고사가 존재하지 않습니다.',
  )

  // Notice(NO)
  static readonly CAN_NOT_FINE_NOTICE = new CustomError(
    404,
    'NO001',
    '공지글이 존재하지 않습니다.',
  )

  // Test(TE)
  static readonly TEST_ERROR = new CustomError(400, 'TE001', '테스트 에러')
}
