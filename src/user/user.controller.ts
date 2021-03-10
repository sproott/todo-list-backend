import { Controller, Post, Body, Res } from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { Response } from 'express'
import { CryptService } from 'src/common/lib/crypt.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cryptService: CryptService
  ) {}

  private setResponseCookie(userId: string, res: Response) {
    res.cookie('token', `Bearer ${this.cryptService.generateJwt(userId)}`, { httpOnly: true })
  }

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const userId = await this.userService.register(registerUserDto)
    this.setResponseCookie(userId, res)
    return true
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const userId = await this.userService.login(loginUserDto)
    if (!userId) throw new Error('Login unsuccesful')
    this.setResponseCookie(userId, res)
    return true
  }
}
