// nestjs 
import { Controller, Post, Body, Res, HttpStatus, Request, Get, UseGuards, Put, Req, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';

// dto & enum
import { TokenType } from 'src/common/constant/jwt.const';
import { CreateUserDto, RegenerateDto } from '../user/dto/user.dto';

// service
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

// guard
import { AccessTokenGuard } from './guards/access-token.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Media } from '../media/media.schema';
import { BaseStorageService } from '../media/interface/file-storage';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private mediaService: BaseStorageService,
  ) { }

  @Post('/sign-up')
  async signUp(
    @Body() dto: CreateUserDto,
    @Res() response: any,
  ) {
    const tokens = await this.authService.signUp(dto);
    return response.status(HttpStatus.CREATED).json({ ...tokens });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(
    @Request() request: any,
    @Res() response: any,
  ) {
    const tokens = await this.authService.signIn(request.user);
    return response.status(HttpStatus.OK).json({ ...tokens });
  }

  @UseGuards(AccessTokenGuard)
  @Get('/profile')
  async getProfile(
    @Request() request: any,
    @Res() response: any
  ) {
    const { id } = request.user;
    const user = await this.userService.findById(id);
    const convertedUser = this.userService.convertDocumentToProfile(user);
    return response.status(HttpStatus.OK).json({ user: convertedUser });
  }

  @UseGuards(AccessTokenGuard)
  @Post('/log-out')
  async logOut(
    @Request() request: any,
  ) {
    const { id } = request.user;
    return this.authService.logout(id);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/regenerate-tokens')
  async regenerateTokensWhenExpired(
    @Res() response: any,
    @Request() request: any
  ) {
    const { id, refreshToken } = request.user;
    const tokens = await this.authService.regenerateTokensWhenExpired(id, refreshToken);
    return response.status(HttpStatus.OK).json({ ...tokens });
  }

  @UseGuards(AccessTokenGuard)
  @Put('update-email')
  async updateEmail(
    @Request() request: any,
    @Res() response: any
  ) {
    const { id } = request.user;
    const { oldEmail, newEmail } = request.body;

    let user = await this.userService.findByEmail(newEmail);
    if (user.data != null) {
      throw new BadRequestException("Your new email already existed!");
    }
    user = await this.userService.findByEmail(oldEmail);
    if (user.data == null) {
      throw new BadRequestException("Your old email is wrong, update canceled!");
    }
    user.data.email = newEmail;
    const newUser = await this.userService.updateById(id, user.data);
    const convertedUser = this.userService.convertDocumentToProfile(newUser);
    return response.status(HttpStatus.OK).json({ data: convertedUser });
  }

  @UseGuards(AccessTokenGuard)
  @Put('update-password')
  async updatePassword(
    @Request() request: any,
    @Res() response: any
  ) {
    const { id } = request.user;
    const { newPassword, oldPassword } = request.body;

    let user = await this.userService.findById(id);
    const compareResult = await this.authService.compare2HashedStrings(oldPassword, user.password);
    if (!compareResult) {
      throw new BadRequestException("Password Incorrect !");
    }

    const newHashPassword = await this.authService.hashPassword(newPassword);
    user.password = newHashPassword;
    const newUser = await this.userService.updateById(id, user);
    const convertedUser = this.userService.convertDocumentToProfile(newUser);
    return response.status(HttpStatus.OK).json({ user: convertedUser });
  }

  @UseGuards(AccessTokenGuard)
  @Put('update-general')
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

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Put('update-avatar')
  async updateAvatar(
    @Request() request: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Media> {
    const { id } = request.user;
    const media = await this.mediaService.uploadFile(file);
    const user = await this.userService.findById(id);
    const mediaUrl = await this.mediaService.updateACL(media._id);
    user.avatarUrl = mediaUrl;
    await this.userService.updateById(id, user);
    return media;
  }
}
