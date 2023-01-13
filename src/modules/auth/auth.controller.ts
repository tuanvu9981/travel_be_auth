import { Controller, Post, Body, Res, HttpStatus, Request, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { USER_RESPONSE_CODES } from 'src/common/enum/enum.user';
import { CreateUserDto } from '../user/dto/user.dto';
import { UserDocument } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  // @Post('/sign-up')
  // async signUp(
  //   @Body() dto: CreateUserDto,
  //   @Res() response: any,
  // ) {
  //   const check = await this.userService.findByEmail(dto.email);
  //   if (check.responseCode === USER_RESPONSE_CODES.EXISTED) {
  //     return response.status(HttpStatus.BAD_REQUEST).json({
  //       status: HttpStatus.BAD_REQUEST,
  //       message: "Email duplicated",
  //       data: null
  //     });
  //   }

  //   // no duplication --> hash password & save db
  //   dto.password = await this.authService.hashPassword(dto.password);
  //   // return this.userService.create(dto);

  //   const newUser = this.userService.create(dto);
  //   return response.status(HttpStatus.CREATED).json({
  //     status: HttpStatus.CREATED,
  //     data: newUser
  //   });
  // }

  // @UseGuards(AuthGuard('local'))
  // @Post('/sign-in')
  // async signIn(
  //   @Request() request: any
  // ): Promise<any> {
  //   return this.authService.signIn(request.user);
  //   // user (request.user) is created inside LocalStrategy
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('users/:id')
  // async getUserById(
  //   @Param() id: string
  // ): Promise<UserDocument> {
  //   const user = await this.userService.findById(id);
  //   return user;
  // }
}
