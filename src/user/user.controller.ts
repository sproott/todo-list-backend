import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { Request, Response } from 'express'
import { CryptService } from 'src/common/lib/crypt.service'
import { User } from './entities/user.entity'
import { failure, SimpleResponse, success } from 'src/common/util/response/simpleResponse'
import { ConfigService } from '@nestjs/config'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cryptService: CryptService,
    private configService: ConfigService
  ) {}

  private setTokenCookie(userId: string, res: Response) {
    res.cookie('token', `Bearer ${this.cryptService.generateJwt(userId)}`, {
      httpOnly: true,
      secure: this.configService.get('env') === 'production',
    })
  }

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<SimpleResponse> {
    const userId = await this.userService.register(registerUserDto)

    if (!userId) return failure

    this.setTokenCookie(userId, res)
    return success
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<SimpleResponse> {
    const userId = await this.userService.login(loginUserDto)
    if (!userId) return failure
    this.setTokenCookie(userId, res)
    return success
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response): Promise<SimpleResponse> {
    res.clearCookie('token')
    return success
  }

  @Get()
  async currentUser(@Req() req: Request): Promise<Omit<User, 'password'>> {
    if (!req.userId) return null
    const user = await User.query().findById(req.userId)
    delete user.password
    return user
  }
}
