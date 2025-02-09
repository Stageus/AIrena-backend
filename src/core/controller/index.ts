import { NextFunction, Request, Response } from 'express'

type Constructor<T> = new (data: any) => T

/**
 * @param {Constructor<QueryType> | null} QueryClass
 *   - 쿼리 파라미터, 사용하지 않을 경우 null로 전달합니다.
 * @param {Constructor<PathType> | null} PathClass
 *   - 패스 파라미터, 사용하지 않을 경우 null로 전달합니다.
 * @param {Constructor<BodyType> | null} BodyClass
 *   - 요청 바디, 사용하지 않을 경우 null로 전달합니다.
 * @param {Constructor<ResponseType> | null} ResponseClass
 *   - 응답 바디, 사용하지 않을 경우 null로 전달합니다.
 *  */
const controller = <
  QueryType = {},
  PathType = {},
  BodyType = {},
  ResponseType = void,
>(
  QueryClass: Constructor<QueryType> | null,
  PathClass: Constructor<PathType> | null,
  BodyClass: Constructor<BodyType> | null,
  ResponseClass: Constructor<ResponseType> | null,
) => {
  return (
      handler: (
        req: Request<PathType, any, BodyType, QueryType>,
        res: Response<ResponseType>,
      ) => Promise<any>,
    ) =>
    async (
      req: Request<PathType, any, BodyType, QueryType>,
      res: Response<ResponseType>,
      next: NextFunction,
    ) => {
      try {
        if (QueryClass) new QueryClass(req.query)
        if (PathClass) new PathClass(req.params)
        if (BodyClass) new BodyClass(req.body)

        await handler(req, res)
      } catch (error) {
        return next(error)
      }
    }
}

export default controller
