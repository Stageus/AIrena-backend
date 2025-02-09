import { S3Client } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'
import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path'
dotenv.config()

const s3Uploader = multer({
  storage: multerS3({
    s3: new S3Client(),
    bucket: 'ai-rena-files',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      const utf8FileName = Buffer.from(file.originalname, 'latin1').toString(
        'utf8',
      )
      cb(null, `${Date.now()}_${path.basename(utf8FileName)}`)
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
})

export default s3Uploader
