import ErrorRegistry from '#error/ErrorRegistry'
import { NextFunction, Request, Response } from 'express'
import CustomError from './types/CustomError.js'
import ErrorInfo from './types/ErrorInfo.js'

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
