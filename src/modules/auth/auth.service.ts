// nestjs
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from 'src/common/constant/jwt.const';

// services and enums
import { UserService } from '../user/user.service';

// encrypt tool
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/user.dto';
import { ACCESS_TOKEN_JWT, REFRESH_TOKEN_JWT } from 'src/common/constant/jwt.const';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare2HashedStrings(ipPassword: string, dbPassword: string): Promise<boolean> {
    // input password: 1st param | encrypted database password: 2nd param
    return await bcrypt.compare(ipPassword, dbPassword);
  }

  async authenticate(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user.data != null) {
      const check = await this.compare2HashedStrings(password, user.data.password);
      if (check) return user.data;
      else return null;
    }
    return null;
  }

  async signIn(user: any): Promise<TokenType> {
    const tokens = await this.getTokens(user._id);
    await this.updateRefreshTokenIntoDB(user._id, tokens.refreshToken);
    return tokens;
  }

  async signUp(dto: CreateUserDto): Promise<TokenType> {
    const isExisted = await this.userService.findByEmail(dto.email);
    if (isExisted.data != null) {
      throw new BadRequestException('User with same email existed!');
    }

    const hashedPw = await this.hashPassword(dto.password);
    const newUser = await this.userService.create({ ...dto, password: hashedPw });
    const tokens = await this.getTokens(newUser._id);
    await this.updateRefreshTokenIntoDB(newUser._id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string): Promise<void> {
    const user = await this.userService.findById(userId);
    user.refreshToken = null;
    await this.userService.updateById(userId, user);
  }

  async updateRefreshTokenIntoDB(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashPassword(refreshToken);
    // save into db -> must hash

    const user = await this.userService.findById(userId);
    user.refreshToken = hashedRefreshToken;
    await this.userService.updateById(userId, user);
  }

  async regenerateTokensWhenExpired(userId: string, refreshToken: string): Promise<TokenType>{
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken){
      throw new NotFoundException('User not found!');
    }
    const isMatched = await this.compare2HashedStrings(refreshToken, user.refreshToken);
    if (!isMatched) throw new ForbiddenException('Access denied!');
    const tokens = await this.getTokens(userId);
    await this.updateRefreshTokenIntoDB(userId, tokens.refreshToken);
    return tokens;
  }

  async getTokens(userId: string): Promise<TokenType> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
        },
        {
          secret: ACCESS_TOKEN_JWT.KEY,
          expiresIn: ACCESS_TOKEN_JWT.EXPIRE
        }
      ),
      this.jwtService.signAsync(
        {
          id: userId,
        },
        {
          secret: REFRESH_TOKEN_JWT.KEY,
          expiresIn: REFRESH_TOKEN_JWT.EXPIRE
        }
      )
    ]);

    return { accessToken, refreshToken };
  }



}
