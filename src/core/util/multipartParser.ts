import multer from '#core/config/multer'
import ErrorRegistry from '#core/error/errorRegistry'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
dotenv.config()

const oldBaseUrl = process.env.AWS_S3_BUCKET_BASE_URL as string
const newBaseUrl = process.env.AWS_CLOUDFRONT_BASE_URL as string

const replaceBaseUrl = (url: string): string => {
  return newBaseUrl + url.slice(oldBaseUrl.length)
}

const multipartParser = (contentType: string, limit: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    multer.array(contentType, limit)(req, res, (err) => {
      if (!Array.isArray(req.files)) {
        return next(ErrorRegistry.INTERNAL_SERVER_ERROR)
      }

      for (const file of req.files) {
        const multerFile = file as Express.MulterS3.File
        if (!multerFile.contentType.startsWith(contentType)) {
          return next(ErrorRegistry.INVALID_CONTENT_TYPE)
        }
        if (!multerFile.location.startsWith(oldBaseUrl)) {
          return next(ErrorRegistry.INTERNAL_SERVER_ERROR)
        }
      }

      const uploadUrls = req.files.map((file) => {
        const multerFile = file as Express.MulterS3.File
        return replaceBaseUrl(multerFile.location)
      })

      req.body = { ...req.body, uploadUrls }
      next()
    })
  }
}

export default multipartParser
