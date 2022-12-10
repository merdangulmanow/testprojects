import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Roles } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { UserModel } from 'src/users/modesl/users.model';
import { UsersService } from 'src/users/users.service';
import { ChangeStatusDTO } from './dto/change.status.dto';
import { CreateModeratorDTO } from './dto/moderator.create.dto';
import { ModeratorModel } from './moderators.model';

@Injectable()
export class ModeratorsService {
    constructor(
        @InjectModel(ModeratorModel) private readonly moderatorRepository : typeof ModeratorModel,
        private readonly roleService : RolesService,
        private readonly userService : UsersService,
        private jwtService: JwtService
    ){}


    async toBoModerator(dto : CreateModeratorDTO){
        try {
            const condidate : ModeratorModel = await this.getByUserId(dto.userId)
            if(condidate){
                throw new HttpException("this moderator already registred", HttpStatus.CONFLICT)
            }

            const moderatorRole : Roles = await this.roleService.getRoleByName('moderator')
            if(!moderatorRole){
                throw new HttpException("can't find author role", HttpStatus.NOT_FOUND)
            }
            const moderator : ModeratorModel = await this.moderatorRepository.create({
                userId : dto.userId,
            })
            await this.roleService.createRoleToUser(dto.userId, moderatorRole.id)
            const token = await this.generateToken(dto.userId)
            return {moderator, token}
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async changeStatus(dto : ChangeStatusDTO){
        try {
            const condidate : ModeratorModel = await this.getByUserId(dto.userId)
            if(!condidate){
                throw new HttpException("can't find this moderator", HttpStatus.CONFLICT)
            }
            condidate.status = dto.status
            await condidate.save()
            return condidate
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getByUserId(userId : number){
        try {
            const condidate : ModeratorModel = await this.moderatorRepository.findOne({where : {userId : userId},
                include : [
                    {
                        model : UserModel
                    }
                ]
            })
            return condidate
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    private async generateToken(userId : number) {
        const userData : UserModel = await this.userService.getUserById(userId)

        const roles : string[] = [];
        for(let i = 0; i < userData.roles.length; i++){
            roles.push(userData.roles[i].name)
        }

        const payload = {email: userData.email, id: userId, roles: roles}
        return this.jwtService.sign(payload)

    }


}