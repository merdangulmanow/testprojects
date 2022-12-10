import { Body, Controller, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create.user.dto';
import { LoginUserDTO } from 'src/users/dto/login.user.dto';
import { AuthService } from './auth.service';
import { authConflictRespone, authSignInConflictResponse, signUpResponse } from './response/response';

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @ApiOperation({summary: 'registration of new user, sign up'})
    @ApiOkResponse({schema :{example : signUpResponse}})
    @ApiConflictResponse({schema : {example : authConflictRespone}})
    @Post('/signup')
    signUp(@Body() dto : CreateUserDTO){
        return this.authService.signUp(dto)
    }

    @ApiOperation({summary: 'sign in of user'})
    @ApiOkResponse({schema :{example : signUpResponse}})
    @ApiConflictResponse({schema : {example : authSignInConflictResponse}})
    @Post('/signin')
    singIn(@Body() dto : LoginUserDTO){
        return this.authService.signIn(dto)
    }

}