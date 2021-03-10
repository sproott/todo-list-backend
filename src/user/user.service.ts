import { CryptService } from 'src/common/lib/crypt.service'
import { Injectable } from '@nestjs/common'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(private cryptService: CryptService) {}

  async register(registerUserDto: RegisterUserDto) {
    const { username, password } = registerUserDto

    const { id } = await User.query().insert({
      username,
      password: await this.cryptService.hash(password),
    })

    return id
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto
    const user = await User.query().findOne('username', username)
    if (!user) return false
    if (await this.cryptService.compare(password, user.password)) {
      return user.id
    } else {
      return false
    }
  }

  async findOne(id: string) {
    return User.query().findById(id)
  }
}
