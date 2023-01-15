// nestjs 
import { Controller, Post, Body, Res, HttpStatus, Request, Get, UseGuards, Put } from '@nestjs/common';

// dto & enum
import { USER_RESPONSE_CODES } from 'src/common/enum/enum.user';
import { ERR_RESPONSE_CODE } from 'src/common/error/error.code';
import { CreateUserDto, ReturnUserDto } from '../user/dto/user.dto';

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
        message: ERR_RESPONSE_CODE.EMAIL_EXISTED,
      });
    }

    // no duplication --> hash password & save db
    dto.password = await this.authService.hashPassword(dto.password);
    const newUser = await this.userService.create(dto);
    const newToken = await this.authService.signIn({ _id: newUser.id });

    // add newToken to white list
    // newUser.whiteList.push(newToken.access_token);
    // await this.userService.updateById(newUser._id, newUser);

    return response.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: new ReturnUserDto(
        newUser.email, newUser.fullname, newUser.avatarUrl,
        newUser.role, newUser.money, newUser._id
      ),
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

  @UseGuards(JwtAuthGuard)
  @Put('update-email')
  async updateEmail(
    @Request() request: any,
    @Res() response: any
  ) {
    const { id } = request.user;
    const newEmail = request.body.email;

    const check = await this.userService.findByEmail(newEmail);
    if (check.responseCode === USER_RESPONSE_CODES.EXISTED) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ERR_RESPONSE_CODE.EMAIL_EXISTED,
      });
    }
    const newUser = await this.userService.updateById(id, request.body);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: newUser,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-password')
  async updatePassword(
    @Request() request: any,
    @Res() response: any
  ) {
    const { id } = request.user;
    const { newPassword, oldPassword, ...userData } = request.body;

    let user = await this.userService.findById(id);
    const compareResult = await this.authService.comparePassword(oldPassword, user.password);
    if (!compareResult) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ERR_RESPONSE_CODE.OLD_PW_INCORRECT
      });
    }

    const newHashPassword = await this.authService.hashPassword(newPassword);
    user = { ...userData, password: newHashPassword };
    const newUser = await this.userService.updateById(id, user);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: newUser,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('general')
  async updateGeneral(
    @Request() request: any,
    @Res() response: any
  ) {
    const { id } = request.user;
    const newUser = await this.userService.updateById(id, request.body);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: newUser,
    });
  }
}
