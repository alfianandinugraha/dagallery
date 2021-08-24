declare module 'api' {
  export interface ImageFirebase {
    fileName: string
    publicId: string
    format: string
    createdAt: number
    version: number
    title: string
    id: string
  }

  export interface Response {
    message: string
  }

  export interface ApiResponse<T> extends Response {
    data: T
  }
}