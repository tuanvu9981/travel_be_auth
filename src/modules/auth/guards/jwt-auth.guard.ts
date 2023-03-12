import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "src/common/constant/public.const";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {

//     constructor(private reflector: Reflector) {
//         super();
//     }

//     canActivate(context: ExecutionContext) {

//         const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
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
// }