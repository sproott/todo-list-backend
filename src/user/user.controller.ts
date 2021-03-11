import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { Request, Response } from 'express'
import { CryptService } from 'src/common/lib/crypt.service'
import { User } from './entities/user.entity'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cryptService: CryptService
  ) {}

  private setTokenCookie(userId: string, res: Response) {
    res.cookie('token', `Bearer ${this.cryptService.generateJwt(userId)}`, { httpOnly: true })
  }

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const userId = await this.userService.register(registerUserDto)
    this.setTokenCookie(userId, res)
    return true
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const userId = await this.userService.login(loginUserDto)
    if (!userId) throw new Error('Login unsuccesful')
    this.setTokenCookie(userId, res)
    return true
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token')
    return true
  }

  @Get()
  async currentUser(@Req() req: Request): Promise<Omit<User, 'password'>> {
    if (!req.userId) return null
    const user = await User.query().findById(req.userId)
    delete user.password
    return user
  }
}
