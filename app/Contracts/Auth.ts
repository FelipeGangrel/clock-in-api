export interface AuthenticationResponse {
  token: string
  profile: {
    id: number
    email: string
    fullName: string
    firstName: string
    lastName: string
    role: string
  }
}

export interface GeneratePasswordResetTokenPayload {
  email: string
}

export interface ResetPasswordPayload {
  email: string
  token: string
  password: string
}
