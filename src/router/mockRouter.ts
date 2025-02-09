import getAsyncRouter from '#asyncRouter'
import multipartParser from '#core/util/multipartParser'
import MockWriteRequest from '#dto/request/MockWriteRequest./MockWriteRequest'
import MockWriteResponse from '#dto/response/MockPostResponse'
import { randomUUID } from 'crypto'
import { Request, Response } from 'express'

export const mockRouter = getAsyncRouter()

mockRouter.post(
  '/write',
  multipartParser('image', 1),
  async (
    req: Request<{}, {}, MockWriteRequest, {}>,
    res: Response<MockWriteResponse>,
  ): Promise<any> => {
    console.log(req.body)
    return res.send(new MockWriteResponse(randomUUID()))
  },
)
