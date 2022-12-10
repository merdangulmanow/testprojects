import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HelperService } from 'src/helper/helper.service';
import { Roles } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { UserRoles } from 'src/roles/user-roles.model';
import { Topics } from 'src/topics/topic.model';
import { createUserDTO } from './dto/create.user.dto';
import { createUserTopicDTO } from './dto/create.user.topic.dto';
import { UserTopicModel } from './modesl/user.topics.model';
import { UserModel } from './modesl/users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserModel) private readonly userRepository : typeof UserModel,
        @InjectModel(UserTopicModel) private readonly userTopicRepository : typeof UserTopicModel,
        private roleService: RolesService, 
        private readonly helperService : HelperService
    ){}

    async createUser(dto: createUserDTO) {
        try {
            const condidate : UserModel = await this.getByEmail(dto.email)
            if(condidate){
                throw new HttpException("email already registred", HttpStatus.CONFLICT)
            }
            const user = await this.userRepository.create({
                fullName : dto.fullName,
                email : dto.email, 
                // password : dto.password
            });
            // user.validated = dto.validated
            await user.save();
            const role = await this.roleService.getRoleByName("user")
            await this.roleService.createRoleToUser(user.id, role.id)
            // await this.helperService.sendEmail(dto.email)
            return user;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getByEmail(email : string){
        try {
            const condidate : UserModel = await this.userRepository.findOne({where : {email : email}, include : {model : Roles}})
            return condidate
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async addTopicToUser(dto : createUserTopicDTO){
        try {
            const userTopics : UserTopicModel[] = await this.getAllTopicByUserId(dto.userId)
            if(userTopics.length >= 3){
                throw new HttpException("can't choose more than 3", HttpStatus.BAD_REQUEST)
            }
            var createdValues  = [];
            for(let i = 0; i < dto.topicId.length; i++){
                createdValues.push({
                    userId : dto.userId,
                    topicId : dto.topicId[i]
                })
            }
            console.log('\n\n\n\n ............................................kkk')
            console.log(createdValues)
            const values : UserTopicModel[] = await this.userTopicRepository.bulkCreate(createdValues)
            return values
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getAllTopicByUserId(userId : number){
        try {
            const userTopics : UserTopicModel[] = await this.userTopicRepository.findAll({where : {userId : userId}})
            return userTopics
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserById(userId : number){
        try {
            const user : UserModel = await this.userRepository.findOne({where : {id : userId}, include : [
                {model : Roles},
                {model : Topics}
            ]})
            return user
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async changeAvatar(image : any, user : UserModel){
        try {
            const fileName : string = await this.helperService.createFile(image)
            const condidate : UserModel = await this.userRepository.findOne({where : {id : user.id}})
            if(!condidate){
                throw new HttpException("can't find user", HttpStatus.NOT_FOUND)
            }
            condidate.avatar = fileName;
            await condidate.save()
            return condidate
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getOnlyUserByEmail(email : string){
        try {
            const user = await this.userRepository.findOne({where : {email : email}})
            return user
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

}