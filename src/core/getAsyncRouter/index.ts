import express, { Router } from 'express'
import asyncify from 'express-asyncify'

const getAsyncRouter = (): Router => {
  return asyncify(express.Router())
}

export default getAsyncRouter
