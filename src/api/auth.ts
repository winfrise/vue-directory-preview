import { request } from '@/utils/request'

export interface LoginResponse {
  data: {
    token: string
  }
}

export const login = (data: { username: string; password: string }) => {
  return request.post<LoginResponse>('/auth/login', data).then(res => res.data)
}