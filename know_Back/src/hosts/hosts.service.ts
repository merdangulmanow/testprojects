import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHostDTO } from './dto/create.host.dto';
import { HostModel } from './hosts..model';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { refreshTokenDTO } from './dto/refresh.token.dto';

@Injectable()
export class HostsService {
    constructor(
        @InjectModel(HostModel) private readonly hostRepository : typeof HostModel,
        private readonly jwtService: JwtService,
    ){}

    async createHost(dto : CreateHostDTO){
        try {

            const condidate : HostModel = await this.getCondidate(dto.password)
            if(condidate){
                throw new HttpException("already registred", HttpStatus.NOT_FOUND)
            }

            const hashPassword : string = await bcrypt.hash(dto.password, 9);
            const host : HostModel = await this.hostRepository.create({password : hashPassword})

            const payload = {id : host.id, roles : [host.role] }
            const tokens = await this.createToken(payload)

            host.refreshToken = tokens.refreshToken
            await host.save()
            return tokens
            
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async loginHost(dto : CreateHostDTO){
        try {
            const condidate : HostModel = await this.getCondidate(dto.password)
            if(!condidate){
                throw new HttpException("can't find condidate", HttpStatus.NOT_FOUND)
            }
            const payload = {id : condidate.id, roles : [condidate.role] }
            const tokens = await this.createToken(payload)
            return tokens
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async refreshToken(dto : refreshTokenDTO){
        try {
            const hostData = await this.validateRefreshToken(dto.refreshToken);
            console.log(hostData)
            const tokenFromDb = await this.hostRepository.findOne({where : {refreshToken : dto.refreshToken}})
            console.log(tokenFromDb)
            if (!hostData || !tokenFromDb) {
                throw new HttpException("can't find this user", HttpStatus.NOT_FOUND)
            }
            const condidate : HostModel = await this.hostRepository.findOne(hostData.id);
            const payload = {id : condidate.id, roles : [condidate.role] }

            const tokens = await this.createToken(payload)

            condidate.refreshToken = tokens.refreshToken
            await condidate.save()
            return tokens
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }


    private async getCondidate(password : string){
        try {
            const hosts : HostModel[] = await this.hostRepository.findAll()
            for (let i = 0; i < hosts.length; i++){
                const passwordEquals = await bcrypt.compare(password, hosts[i].password);
                if(passwordEquals){
                    return hosts[i]
                }
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    private async createToken(payload){
        const access = this.jwtService.sign(payload, {secret: process.env.ACCESS_HOST_PRIVATE_KEY, expiresIn: `24h`});
        const refresh = this.jwtService.sign(payload, {secret: process.env.REFRESH_HOST_PRIVATE_KEY, expiresIn: `30d`});
        return { accessToken : access, refreshToken : refresh }
    }

    private async validateRefreshToken(refreshToken : string){
        try {
            const hostData = this.jwtService.verify(refreshToken, {secret: process.env.REFRESH_HOST_PRIVATE_KEY});
            return hostData
        } catch (err) {
            console.log(err)
            console.log('\n\n validateRefreshToken error')
            return null
        }
    }
}