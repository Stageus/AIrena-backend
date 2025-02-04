import { NextFunction, Request, Response } from 'express'
import CustomError from '#error/customError'
import ErrorInfo from '#error/errorInfo'
import ErrorRegistry from '#error/errorRegistry'

export default function globalExceptionHandler(
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
): any {
  console.error(err)
  if (!(err instanceof CustomError)) {
    err = ErrorRegistry.INTERNAL_SERVER_ERROR
  }

  const customError = err as CustomError
  return res.status(customError.status).json(new ErrorInfo(customError))
}
