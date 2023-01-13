import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
// import { IS_PUBLIC } from "src/common/constant/jwt.const";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {

//     constructor(private reflector: Reflector){
//         super();
//     }

//     canActivate(context: ExecutionContext) {

//         const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
//             context.getHandler(),
//             context.getClass(),
//         ]);
//         if (isPublic){
//             return true;
//         }
//         // Add your custom authentication logic here
//         // for example, call super.logIn(request) to establish a session.
//         return super.canActivate(context);
//     }

//     handleRequest(err: any, user: any, info: any) {
//         if (err || !user) {
//             throw err || new UnauthorizedException();
//         }
//         return user;
//     }
// }