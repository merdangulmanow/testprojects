import { HttpException, HttpService, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createUserDTO } from 'src/users/dto/create.user.dto';
import { UserModel } from 'src/users/modesl/users.model';
import { UsersService } from 'src/users/users.service';
import { AuthValidateModel } from './auth.validate.model';
import { EmailValidateDTO } from './dto/email.validate.dto';
import { loginUserDTO } from './dto/login.user.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { HelperService } from 'src/helper/helper.service';
import { createUserTopicDTO } from 'src/users/dto/create.user.topic.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AuthValidateModel) private readonly emailValidateRepository : typeof AuthValidateModel,
        private readonly userService : UsersService,
        private jwtService: JwtService,
        private readonly helperService : HelperService
    ){}

    async validateEmail(dto : EmailValidateDTO){
        try {
            const data = await this.helperService.getCodeByEmail(dto.email)
            if(!data){
                throw new HttpException("invalid data", HttpStatus.CONFLICT)
            }
            const user : UserModel = await this.userService.getByEmail(dto.email)
            if(user){
                const tokens = await this.createToken(user);
                user.validated = true;
                await user.save()
                return { message : "successfuly validated", user : user, accessToken : tokens.accessToken, refreshToken : tokens.refreshToken }
            }
            return { message : "successfuly validated" }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async registration(dto : createUserDTO){
        try {
            const condidate : UserModel = await this.userService.getByEmail(dto.email)
            if(condidate){
                throw new HttpException("alread registred", HttpStatus.CONFLICT)
            }
            // const hashPassword : string = await bcrypt.hash(dto.password, 5);
            const user : UserModel = await this.userService.createUser(dto)
            const c_user : UserModel = await this.userService.getByEmail(dto.email)
            const userTopics : createUserTopicDTO = {
                userId : c_user.id,
                topicId : dto.topicId
            }
            await this.userService.addTopicToUser(userTopics)
            return this.createToken(c_user)
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async login(userDto : loginUserDTO){
        try {
            const user : UserModel = await this.userService.getByEmail(userDto.email)
            // if(!user){
            //     throw new HttpException("user not found", HttpStatus.CONFLICT)
            // }
            const response = await this.helperService.sendEmail(userDto.email)
            console.log(response)
            return { message : "code sent"}
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }




    private async validateUser(userDto: loginUserDTO) {
        const user = await this.userService.getByEmail(userDto.email);
        // const passwordEquals = await bcrypt.compare(userDto.code, user.password);
        // if (user && passwordEquals) {
        //     return user;
        // }
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }

    private async generateToken(user: UserModel) {
        const roles : string[] = [];
        for(let i = 0; i < user.roles.length; i++){
            roles.push(user.roles[i].name)
        }
        const payload = {email: user.email, id: user.id, roles: roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async createToken(user: UserModel){

        const roles : string[] = [];
        for(let i = 0; i < user.roles.length; i++){
            roles.push(user.roles[i].name)
        }
        const payload = {email: user.email, id: user.id, roles: roles}

        const access = this.jwtService.sign(payload, {secret: process.env.PRIVATE_ACCESS_KEY, expiresIn: `24h`});
        const refresh = this.jwtService.sign(payload, {secret: process.env.PRIVATE_REFRESH_KEY, expiresIn: `30d`});
        return { accessToken : access, refreshToken : refresh }
    }
}