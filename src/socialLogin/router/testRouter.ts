import controller from '#controller'
import ErrorRegistry from '#error/ErrorRegistry'
import express from 'express'

export const testRouter = express.Router()

testRouter.get(
  '/internal-error',
  controller(
    null,
    null,
    null,
    null,
  )(async (req, res) => {
    throw new Error('Internal Server Error')
  }),
)

testRouter.get(
  '/custom-error',
  controller(
    null,
    null,
    null,
    null,
  )(async (req, res) => {
    throw ErrorRegistry.TEST_ERROR
  }),
)
