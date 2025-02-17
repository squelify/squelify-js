export interface ApiResponse<T = unknown> {
  status: number
  success: boolean
  message: string | null
  data?: T
  error?: {
    issues?: Array<{ field: string; message: string }>
    stack?: string
  }
}
