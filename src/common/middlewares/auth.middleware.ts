import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

import { UserService } from 'src/user/user.service'
import jwt from 'jsonwebtoken'

export type JwtPayload = {
  id: string
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  private decodeToken(token: string): string | false {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
      return decoded.id
    } catch (err) {
      return false
    }
  }

  async use(req: Request, res: Response, next: () => void) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const cookie = req.cookies.token as string
    if (!cookie) {
      throw new Error('Not logged in')
    }
    const token = cookie.split(' ')[1]
    const userId = this.decodeToken(token)
    if (!userId) {
      throw new Error('Failed to decode token')
    }
    if (!(await this.userService.findOne(userId))) {
      res.cookie('token', null)
      throw new Error('User does not exist')
    }
    req.userId = userId
    next()
  }
}
