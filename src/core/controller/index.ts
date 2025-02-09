import { Request, Response } from 'express'

type Constructor<T> = new (data: any) => T

/**
 * @param {Constructor<TQuery> | null} QueryCls
 *   - 쿼리 파라미터, 사용하지 않을 경우 null로 전달합니다.
 * @param {Constructor<TParams> | null} PathCls
 *   - 패스 파라미터, 사용하지 않을 경우 null로 전달합니다.
 * @param {Constructor<TBody> | null} BodyCls
 *   - 요청 바디, 사용하지 않을 경우 null로 전달합니다.
 * @param {Constructor<TResponse> | null} ResponseCls
 *   - 응답 바디, 사용하지 않을 경우 null로 전달합니다.
 *  */
const controller =
  <TQuery, TParams, TBody, TResponse>(
    QueryCls: Constructor<TQuery> | null,
    PathCls: Constructor<TParams> | null,
    BodyCls: Constructor<TBody> | null,
    ResponseCls: Constructor<TResponse> | null,
  ) =>
  (
    handler: (
      req: Request<TParams, any, TBody, TQuery>,
      res: Response<TResponse>,
    ) => Promise<any>,
  ) =>
  async (
    req: Request<TParams, any, TBody, TQuery>,
    res: Response<TResponse>,
  ) => {
    if (QueryCls) new QueryCls(req.query)
    if (PathCls) new PathCls(req.params)
    if (BodyCls) new BodyCls(req.body)
    if (ResponseCls) new ResponseCls(res)

    return await handler(req, res)
  }

export default controller
