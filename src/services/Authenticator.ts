import * as jwt from 'jsonwebtoken'
import { AuthenticationData } from '../model/AuthenticationData'

export class Authenticator {
  public generate(input: AuthenticationData): string {
    const token = jwt.sign(
      {
        id: input.id,
        role: input.role
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    )
    return token
  }

  public getTokenData(token: string): AuthenticationData{
    const data = jwt.verify(token, process.env.JWT_SECRET as string)
    return data as AuthenticationData
  }
}