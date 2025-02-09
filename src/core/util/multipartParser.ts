import multer from '#core/config/multer'
import ErrorRegistry from '#core/error/errorRegistry'
import { NextFunction, Request, Response } from 'express'
import { MulterError } from 'multer'

const multipartParser = (contentType: string, limit: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    multer.array(contentType, limit)(req, res, (err) => {
      if (err) {
        if (err instanceof MulterError) {
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return next(ErrorRegistry.TOO_MANY_FILES)
          }
        }
      }

      if (Array.isArray(req.files)) {
        for (const file of req.files) {
          const multerFile = file as Express.MulterS3.File
          if (multerFile.contentType.startsWith(contentType)) {
            return next(ErrorRegistry.INVALID_CONTENT_TYPE)
          }
        }
      }

      next()
    })
  }
}

export default multipartParser
