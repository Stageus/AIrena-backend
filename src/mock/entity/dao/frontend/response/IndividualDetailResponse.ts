export default class IndividualDetailResponse {
  constructor(
    public readonly owner: boolean,
    public readonly admin: boolean,
    public readonly solved: boolean,
    public readonly pushLike: boolean,
  ) {}
}
