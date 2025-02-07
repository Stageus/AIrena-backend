import getAsyncRouter from '#asyncRouter'
import ErrorRegistry from '#error/errorRegistry'
import { Request, Response } from 'express'

export const testRouter = getAsyncRouter()

testRouter.get('/internal-error', async (req: Request, res: Response) => {
  throw new Error('Internal Server Error')
})

testRouter.get('/custom-error', async (req: Request, res: Response) => {
  throw ErrorRegistry.TEST_ERROR
})
