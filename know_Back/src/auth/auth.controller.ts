import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import loginHostResponse from 'src/authors/response/host.login.response';
import { createUserDTO } from 'src/users/dto/create.user.dto';
import { UserModel } from 'src/users/modesl/users.model';
import { AuthService } from './auth.service';
import { AuthValidateModel } from './auth.validate.model';
import { EmailValidateDTO } from './dto/email.validate.dto';
import { loginUserDTO } from './dto/login.user.dto';
import {emailValidateResponse, validateResponse} from './response/auth.response';

@ApiTags("регистрация, валидация")
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @ApiOperation({summary : "валидация полученного кода"})
    @ApiBody({type: EmailValidateDTO, description: 'example of method for validate code and email'})
    @ApiResponse({status : 201, schema : {example : validateResponse}})
    @Post('/validate')
    emailValidate(@Body() dto : EmailValidateDTO){
        return this.authService.validateEmail(dto)
    }

    @ApiOperation({summary : "регистрация пользователя"})
    @ApiBody({type: createUserDTO, description: 'example of method for registration'})
    @ApiResponse({status : 201, type : UserModel})
    @Post('/registration')
    registrUser(@Body() dto : createUserDTO){
        return this.authService.registration(dto)
    }

    @ApiOperation({summary : "user login"})
    @ApiBody({type : loginUserDTO, description : "example of method for login"})
    @ApiResponse({status : 201, schema: {example : emailValidateResponse}})
    @Post('/login')
    loginUser(@Body() dto : loginUserDTO){
        return this.authService.login(dto)
    }
}