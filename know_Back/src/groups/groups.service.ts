import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/users/modesl/users.model';
import { CreateGroupDTO } from './dto/cretae.group.dto';
import { GroupModel } from './models/groups.mode';

@Injectable()
export class GroupsService {
    constructor(@InjectModel(GroupModel) private readonly groupRepository : typeof GroupModel){}

    async createGroup(user : UserModel, dto : CreateGroupDTO){
        try {
            const userId : number = user.id
            const group : GroupModel = await this.groupRepository.create({
                userId : userId, reason : dto.reason
            })
            return group
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getByID(id : number){
        try {
            const group : GroupModel = await this.groupRepository.findOne({where : {id : id}})
            return group
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getByUser(user: UserModel){
        try {
            const groups : GroupModel[] = await this.groupRepository.findAll({where : {userId : user.id},
                include : [
                    {
                        model : UserModel
                    }
                ]
            })
            return groups
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }
    
}