// nestjs 
import { Controller, Post, Body, Res, HttpStatus, Request, Get, UseGuards } from '@nestjs/common';

// dto & enum
import { USER_RESPONSE_CODES } from 'src/common/enum/enum.user';
import { CreateUserDto } from '../user/dto/user.dto';

// service
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

// guard
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  @Post('/sign-up')
  async signUp(
    @Body() dto: CreateUserDto,
    @Res() response: any,
  ) {
    const check = await this.userService.findByEmail(dto.email);
    if (check.responseCode === USER_RESPONSE_CODES.EXISTED) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Email duplicated",
      });
    }

    // no duplication --> hash password & save db
    dto.password = await this.authService.hashPassword(dto.password);
    const newUser = await this.userService.create(dto);
    const newToken = await this.authService.signIn({ _id: newUser.id });

    return response.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: newUser,
      access_token: newToken.access_token
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(
    @Request() request: any,
    @Res() response: any,
  ) {
    const token = await this.authService.signIn(request.user);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      access_token: token.access_token
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(
    @Request() request: any,
    @Res() response: any
  ) {
    const { id } = request.user;
    const user = await this.userService.findById(id);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: user,
    });
  }
}
