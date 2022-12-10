import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { AdminModel } from './admin.model';
import * as bcrypt from 'bcryptjs'
import { AdminCreateDTO } from './dto/create.admin.dto';
import { loginHost } from './dto/login.host.dto';
import { MailService } from 'src/files/mail.service';
import { checkCodeDTO } from './dto/check.code.dto';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class AdminsService {
    constructor(
        @InjectModel(AdminModel) private readonly adminRepository : typeof AdminModel,
        private jwtService: JwtService,
        private readonly helperService : HelperService
    ){}

    async registrAdminHost(dto : AdminCreateDTO){
        try {
            const condidate : AdminModel = await this.getByEmail(dto.email)
            if(condidate){
                throw new HttpException(`${dto.email} already exists`, HttpStatus.CONFLICT);
            }
            const data : AdminModel = new AdminModel()
            data.email = dto.email;
            await data.save();
            // const data : AdminModel = await this.adminRepository.create(dto)
            return data
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }


    async login(dto : loginHost){
        try {
            const condidate : AdminModel = await this.getByEmail(dto.email)
            if(condidate ){
                await this.helperService.sendEmail(condidate.email)
                return {message : "code sent"}
            }
            throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})

        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async checkCode(dto : checkCodeDTO){
        try {
            const data : any = await this.helperService.getCodeByEmail(dto.email)
            if(!data || data.email != dto.code){
                throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
            }
            const admin : AdminModel = await this.getByEmail(dto.email)
            const payload = {id : admin.id, roles : ["admin"] }
            const tokens = await this.createToken(payload)
            admin.refreshToken = tokens.refreshToken;
            await admin.save()
            return tokens
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getAll(){
        try {
            const data : AdminModel[] = await this.adminRepository.findAll()
            return data
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    private generateJWT(admin : AdminModel){
        const payload = {id : admin.id, email : admin.email, role : [admin]}
        return {token : this.jwtService.sign(payload)}
    }

    private async getByEmail(email : string){
        try {
            const condidate : AdminModel = await this.adminRepository.findOne({where : {email : email}})
            return condidate
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    private async createToken(payload){
        const access = this.jwtService.sign(payload, {secret: process.env.ACCESS_ADMIN_PRIVATE_KEY, expiresIn: `24h`});
        const refresh = this.jwtService.sign(payload, {secret: process.env.REFRESH_ADMIN_PRIVATE_KEY, expiresIn: `30d`});
        return { accessToken : access, refreshToken : refresh }
    }
}