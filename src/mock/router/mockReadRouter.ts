mockRouter.get(
  '/search',
  controller(
    MockSearchRequest,
    null,
    null,
    MockListResponse,
  )(async (req, res) => {
    return res.send(await MockGetService.searchMock(req.query))
  }),
)

mockRouter.get(
  '/list',
  controller(
    MockListRequest,
    null,
    null,
    MockListResponse,
  )(async (req, res) => {
    return res.send(await MockGetService.getMockList(req.query))
  }),
)

mockRouter.get(
  '/:idx',
  controller(
    null,
    MockDetailRequest,
    null,
    MockDetailResponse,
  )(async (req, res) => {
    return res.send(await MockGetService.getMockDetail(req.params))
  }),
)
