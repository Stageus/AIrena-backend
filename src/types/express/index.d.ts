import 'src/types/express/index.js'

declare global {
  namespace Express {
    export interface Request {
      memberIdx: number
    }
  }
}
