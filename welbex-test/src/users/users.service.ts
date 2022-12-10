import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostModel } from 'src/posts/models/posts.model';
import { CreateUserDTO } from './dto/create.user.dto';
import { UserModel } from './models/user.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel) private readonly userRepository : typeof UserModel){}

    async getByEmail(email : string){
        try {
            const user : UserModel = await this.userRepository.findOne({where : {email : email}})
            return user
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async createUser(dto : CreateUserDTO){
        try {
            const user : UserModel = await this.userRepository.create(dto)
            return user
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getAllUsers(){
        try {
            const users : UserModel[] = await this.userRepository.findAll()
            return users
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getOneUsers(id : number){
        try {
            const user : UserModel = await this.userRepository.findOne({
                where : {id : id},
                include : [
                    {
                        model : PostModel
                    }
                ]
            })
            return user
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }
}