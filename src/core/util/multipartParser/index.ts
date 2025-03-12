import ErrorRegistry from '#error/ErrorRegistry'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import multer from './config/multer.js'
dotenv.config()

const oldBaseUrl = process.env.AWS_S3_BUCKET_BASE_URL as string
const newBaseUrl = process.env.AWS_CLOUDFRONT_BASE_URL as string

const replaceBaseUrl = (url: string): string => {
  return newBaseUrl + url.slice(oldBaseUrl.length)
}

const multipartParser = (contentType: string, limit: number) => {
  return (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction,
  ) => {
    multer.array(contentType, limit)(req, res, (err) => {
      if (err) {
        console.error(err)
        return next(ErrorRegistry.FILE_UPLOAD_FAILED)
      }

      if (!Array.isArray(req.files)) {
        return next(ErrorRegistry.FILE_UPLOAD_FAILED)
      }

      for (const file of req.files) {
        const multerFile = file as Express.MulterS3.File
        if (!multerFile.mimetype.startsWith(contentType)) {
          return next(ErrorRegistry.INVALID_CONTENT_TYPE)
        }
        if (!multerFile.contentType.startsWith(contentType)) {
          return next(ErrorRegistry.INVALID_CONTENT_TYPE)
        }
        if (!multerFile.location.startsWith(oldBaseUrl)) {
          return next(ErrorRegistry.FILE_UPLOAD_FAILED)
        }
      }

      const uploadUrls = []
      if (req.body.existingUrls) {
        const existingUrls = req.body.existingUrls.split(',')
        existingUrls.forEach((url: string) => {
          if (!url.startsWith(newBaseUrl)) {
            return next(ErrorRegistry.INVALID_INPUT_FORMAT)
          }
        })
        if (existingUrls.length + req.files.length > limit) {
          return next(ErrorRegistry.INVALID_INPUT_FORMAT)
        }
        uploadUrls.push(...existingUrls)
      }

      uploadUrls.push(
        ...req.files.map((file) => {
          const multerFile = file as Express.MulterS3.File
          return replaceBaseUrl(multerFile.location)
        }),
      )

      req.body = { ...req.body, uploadUrls }
      next()
    })
  }
}

export default multipartParser
