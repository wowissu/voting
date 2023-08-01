export interface APIResponseData<T = any> {
  success: boolean,
  data?: T
}
