import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create.user.dto';
import { LoginUserDTO } from 'src/users/dto/login.user.dto';
import { UserModel } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UsersService,
        private readonly jwtService: JwtService
    ){}

    ///create user
    async signUp(dto : CreateUserDTO){
        try {
            const condidate : UserModel = await this.userService.getByEmail(dto.email)
            if(condidate){
                throw new HttpException("already registered", HttpStatus.CONFLICT)
            }
            const hashPassword : string = await bcrypt.hash(dto.password, 5);
            const user : UserModel = await this.userService.createUser({...dto, password: hashPassword})
            return this.createToken(user)
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async signIn(dto : LoginUserDTO){
        try {
            console.log("................................sign In")
            const condidate : UserModel = await this.userService.getByEmail(dto.email)
            if(condidate){
                const passwordEquals = await bcrypt.compare(dto.password, condidate.password);
                if(passwordEquals){
                    return this.createToken(condidate)
                }
                else {
                    throw new HttpException("invalid data", HttpStatus.CONFLICT)
                }
            } 
            else {
                throw new HttpException("invalid data", HttpStatus.CONFLICT)
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    private async createToken(user : UserModel){
        try {
            const payload = {
                id : user.id, email : user.email, name : user.name
            }
            const token = await this.jwtService.sign(payload)
            return {token}

        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }
}