import getAsyncRouter from '#asyncRouter'
import multipartParser from '#core/util/multipartParser'
import MockPostResponse from '#dto/response/MockPostResponse'
import { randomUUID } from 'crypto'
import { Request, Response } from 'express'

export const mockRouter = getAsyncRouter()

mockRouter.post(
  '/write',
  multipartParser('image', 1),
  async (req: Request, res: Response<MockPostResponse>): Promise<any> => {
    console.log(req.body)
    return res.send(new MockPostResponse(randomUUID()))
  },
)
