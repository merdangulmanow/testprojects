import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from './roles.model';
import { UserRoles } from './user-roles.model';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Roles) private readonly rolesRepository : typeof Roles,
        @InjectModel(UserRoles) private readonly userRolesRepository : typeof UserRoles
    ){}

    async createRole(dto : CreateRoleDto){
        try {
            const condidate : Roles = await this.rolesRepository.findOne({where : {name : dto.name}})
            if(condidate){
                throw new HttpException(`${dto.name} role already exists`, HttpStatus.CONFLICT);
            }
            const role : Roles = await this.rolesRepository.create(dto)
            return role
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getAllRoles(){
        try {
            const roles : Roles[] = await this.rolesRepository.findAll()
            return roles
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getRoleByName(name : string){
        try {
            const role : Roles = await this.rolesRepository.findOne({where :{name : name}})
            return role
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    //  user roles methods
    async createRoleToUser(userId : number, roleId : number){
        try {
            const userRoles : UserRoles = await this.userRolesRepository.create({userId : userId, roleId : roleId})
            return userRoles
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }
}