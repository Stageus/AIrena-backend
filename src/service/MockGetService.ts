// import MockAdapter from '#adapter/MockAdapter'
// import MockDetailRequest from '#dto/frontend/request/MockDetailRequest'
// import MockListRequest from '#dto/frontend/request/MockListRequest'
// import MockQuizRequest from '#dto/frontend/request/MockQuizRequest'
// import MockSearchRequest from '#dto/frontend/request/MockSearchRequest'
// import MockDetailResponse from '#dto/frontend/response/MockDetailResponse'
// import MockListResponse from '#dto/frontend/response/MockListResponse'
// import MockQuizResponse from '#dto/frontend/response/MockQuizResponse'
// import MockResultResponse from '#dto/frontend/response/MockResultResponse'

// export default class MockGetService {
//   static async searchMock(
//     request: MockSearchRequest,
//   ): Promise<MockListResponse> {
//     const currentPageNumber = request.current
//     const displayCount = request.display
//     const offset = (currentPageNumber - 1) * displayCount
//     const title = '%' + request.title + '%'

//     if (request.sort === 'new') {
//       const result = await MockAdapter.getNewMockFilteredList(
//         currentPageNumber,
//         displayCount,
//         offset,
//         title,
//       )

//       return MockListResponse.of(result)
//     }

//     if (request.sort === 'like') {
//       const result = await MockAdapter.getLikeDescMockFilteredList(
//         currentPageNumber,
//         displayCount,
//         offset,
//         title,
//       )

//       return MockListResponse.of(result)
//     }

//     return MockListResponse.createEmpty()
//   }

//   static async getMockList(
//     request: MockListRequest,
//   ): Promise<MockListResponse> {
//     const currentPageNumber = request.current
//     const displayCount = request.display
//     const offset = (currentPageNumber - 1) * displayCount
//     const result = await MockAdapter.getMockList(
//       currentPageNumber,
//       displayCount,
//       offset,
//     )

//     return MockListResponse.of(result)
//   }

//   static async getMockDetail(
//     request: MockDetailRequest,
//   ): Promise<MockDetailResponse> {
//     const result = await MockAdapter.getMockDetail(request.idx)
//     return MockDetailResponse.of(result)
//   }

//   static async getMockQuiz(
//     userIdx: number,
//     request: MockQuizRequest,
//   ): Promise<MockQuizResponse> {
//     const result = await MockAdapter.getMockQuiz(userIdx, request.idx)
//     return MockQuizResponse.of(result)
//   }

//   static async getMockResult(
//     userIdx: number,
//     path: MockQuizRequest,
//   ): Promise<MockResultResponse> {
//     const result = await MockAdapter.getMockResult(userIdx, path.idx)
//     return MockResultResponse.of(result)
//   }
// }
