import type Squelify from '../client'
import type { ApiResponse } from '../types'

interface LoginResponse {
  token: string
}

class AuthService {
  constructor(private apiClient: Squelify) {}

  login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    return this.apiClient._request<ApiResponse<LoginResponse>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }
}

export { AuthService }
