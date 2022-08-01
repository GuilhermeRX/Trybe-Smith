export default class PersonError extends Error {
  public code: number;

  constructor(code: number) {
    super();
    this.code = code;
  }
}