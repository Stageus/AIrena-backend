import CustomError from '#error/CustomError'
import ErrorInfo from '#error/ErrorInfo'
import ErrorRegistry from '#error/ErrorRegistry'

import { NextFunction, Request, Response } from 'express'

export default function globalExceptionHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): any {
  console.error(err)
  if (!err.status) {
    err = ErrorRegistry.INTERNAL_SERVER_ERROR
  }

  return res.status(err.status).json(new ErrorInfo(err))
}
