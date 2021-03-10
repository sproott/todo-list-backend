import { Injectable } from '@nestjs/common'
import { JwtPayload } from '../middlewares/auth.middleware'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

@Injectable()
export class CryptService {
  hash(str: string, saltRounds = 12) {
    return bcrypt.hash(str, saltRounds)
  }

  compare(str: string, hash: string) {
    return bcrypt.compare(str, hash)
  }

  generateJwt(userId: string) {
    return jwt.sign({ id: userId } as JwtPayload, process.env.JWT_SECRET, { expiresIn: '10d' })
  }
}
