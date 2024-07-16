export interface IPayload {
  username: string
  sub: number
}

export interface IRefreshTokenPayload extends IPayload {
  refreshToken: string
}

export interface IAuthResult {
  accessToken: string
  refreshToken: string
}

export interface IAuthUser {
  userId: number
  username: string
}
