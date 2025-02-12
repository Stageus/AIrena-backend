mockRouter.get(
  '/solve/:idx',
  controller(
    null,
    MockQuizRequest,
    null,
    MockQuizResponse,
  )(async (req, res) => {
    return res.send(await MockGetService.getMockQuiz(2, req.params))
  }),
)

mockRouter.post(
  '/solve/:idx',
  controller(
    null,
    MockQuizRequest,
    SubmitAnswerRequest,
    null,
  )(async (req, res) => {
    await AnswerSubmitService.submitAnswer(2, req.params, req.body)
    res.sendStatus(201)
  }),
)

mockRouter.get(
  '/grading/:idx',
  controller(
    null,
    MockQuizRequest,
    null,
    AnswerSubmitResponse,
  )(async (req, res) => {
    return res.send(await AnswerSubmitService.getGradingResult(2, req.params))
  }),
)

mockRouter.get(
  '/result/:idx',
  controller(
    null,
    MockQuizRequest,
    null,
    MockResultResponse,
  )(async (req, res) => {
    return res.send(await MockGetService.getMockResult(2, req.params))
  }),
)
