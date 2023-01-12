import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { USER_RESPONSE_CODES } from 'src/common/enum/enum.user';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../user/schema/user.schema';
import { AuthPayload } from '../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(dbPassword: string, ipPassword: string): Promise<boolean> {
    return await bcrypt.compare(dbPassword, ipPassword);
  }

  async authenticate(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.userService.findByEmail(email);
    if (user.responseCode === USER_RESPONSE_CODES.EXISTED) {
      const check = await this.comparePassword(user.data.password, password);
      if (check) return user.data;
      else return null;
    }
    return null;
  }

  async signIn(user: UserDocument) {
    const payload: AuthPayload = {
      email: user.email,
      fullname: user.fullname,
      avatarUrl: user.avatarUrl,
      role: user.role,
      money: user.money,
    }

    return { access_token: this.jwtService.sign(payload) };
  }

}
