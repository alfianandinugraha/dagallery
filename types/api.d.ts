declare module 'api' {
  export interface ImageResponse {
    fileName: string
    publicId: string
    format: string
    createdAt: number
    version: number
    title: string
  }

  export interface Response {
    message: string
  }

  export interface ApiResponseArray<T> extends Response {
    data: T[]
  }
}