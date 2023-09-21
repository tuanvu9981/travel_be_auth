// nestjs
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// strategies
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { LocalStrategy } from './strategies/local.strategy';

// auth & user 
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { BaseStorageService } from '../media/interface/file-storage';
import { S3Service } from '../media/aws-s3/aws-s3.service';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
    MediaModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: BaseStorageService,
      useClass: S3Service
    }
  ],
  exports: [AuthService]
})
export class AuthModule { }
