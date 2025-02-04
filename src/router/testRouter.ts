import asyncify from 'express-asyncify'
import express, { Request, Response } from 'express'
import ErrorRegistry from '#error/errorRegistry'

export const testRouter = asyncify(express.Router())

testRouter.get('/internal-error', async (req: Request, res: Response) => {
  throw new Error('Internal Server Error')
})

testRouter.get('/custom-error', async (req: Request, res: Response) => {
  throw ErrorRegistry.TEST_ERROR
})
