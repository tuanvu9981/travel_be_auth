// nestjs
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// services and enums
import { UserService } from '../user/user.service';
import { USER_RESPONSE_CODES } from 'src/common/enum/enum.user';

// encrypt tool
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(ipPassword: string, dbPassword: string): Promise<boolean> {
    // input password: 1st param | encrypted database password: 2nd param
    return await bcrypt.compare(ipPassword, dbPassword);
  }

  async authenticate(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user.responseCode === USER_RESPONSE_CODES.EXISTED) {
      const check = await this.comparePassword(password, user.data.password);
      if (check) return user.data;
      else return false;
    }
    return null;
  }

  async signIn(user: any) {
    const payload = {
      id: user._id
    }

    return { access_token: this.jwtService.sign(payload) };
  }

}
