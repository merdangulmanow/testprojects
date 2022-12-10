import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class HostsGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Unauthorized Host'})
            }

            const user = this.jwtService.verify(token, {secret: process.env.ACCESS_HOST_PRIVATE_KEY});
            req.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: 'Unauthorized Host'})
        }
    }

}
