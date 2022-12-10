import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Roles } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { UserModel } from 'src/users/modesl/users.model';
import { UsersService } from 'src/users/users.service';
import { AuthorModel } from './models/author.model';
import { ChangeAuthorStatusDTO } from './dto/change.author.status.dto';
import { CreateAuthorDTO } from './dto/create.author.dto';
import { SocialNetworkDTO } from './dto/social.network.dto';
import { AuthorRequisitesModel } from './models/author.requisites.model';
import { AuhtorTopicsModel } from './models/author.topics.model';
import { AuthorTopicDTO } from './dto/author.topic.dto';
import { Topics } from 'src/topics/topic.model';
import { Op } from 'sequelize';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectModel(AuthorModel) private readonly authorRepository : typeof AuthorModel,
        @InjectModel(AuhtorTopicsModel) private readonly authorTopicRepository : typeof AuhtorTopicsModel,
        private readonly userService : UsersService,
        private readonly roleService : RolesService
    ){}

    async toBeAuthor(user : UserModel, dto : CreateAuthorDTO){
        try {
            const condidate : AuthorModel = await this.getByUserId(user.id)
            if(condidate){
                throw new HttpException("this author already registred", HttpStatus.CONFLICT)
            }
            const social_network : SocialNetworkDTO = {
                instagramLink : dto.instagramLink,
                instagramFollowers : dto.instagramFollowers,
                youtubeLink : dto.youtubeLink,
                youtubeFollowers : dto.youtubeFollowers
            }

            const authorRole : Roles = await this.roleService.getRoleByName('author')
            if(!authorRole){
                throw new HttpException("can't find author role", HttpStatus.NOT_FOUND)
            }
            await this.roleService.createRoleToUser(user.id, authorRole.id)

            const author : AuthorModel = await this.authorRepository.create({
                about : dto.about,
                userId : user.id,
                social_network : social_network,
                topic_string : dto.topic_string
            })
            return {author : author}
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async changeStatus(dto : ChangeAuthorStatusDTO){
        try {
            const author : AuthorModel = await this.getByAuthorID(dto.authorId)
            if(!author){
                throw new HttpException("can't find this author",HttpStatus.NOT_FOUND)
            }
            author.status = dto.status
            author.about = dto.about
            author.social_network = dto.social_network
            await author.save()
            return author
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getByAuthorID(id : number){
        try {
            const author : AuthorModel = await this.authorRepository.findOne({where : {id : id}, include : [
                {
                    model : UserModel, as : 'user'
                }, 
                {
                    model : AuthorRequisitesModel
                }
            ]})
            return author
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }


    // AUTHOR TOPICS BEGIN
    async createAuthorTopic(dto : AuthorTopicDTO) {
        try {
            const condidate : AuhtorTopicsModel = await this.getByAuthorTopic(dto.authorId, dto.authorId)
            if(condidate){
                return condidate
            }
            return this.authorTopicRepository.create(dto)
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async editAuthorTopic(id : number, dto : AuthorTopicDTO) {
        try {
            
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getByAuthorTopic(authorId : number, topicId : number){
        try {
            const condidate : AuhtorTopicsModel = await this.authorTopicRepository.findOne({where : {authorId : authorId, topicId : topicId}})
            return condidate
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }
    // AUTHOR TOPICS END

    

    async getByUserId(userId : number){
        try {
            const condidate : AuthorModel = await this.authorRepository.findOne({where : {userId : userId}, include : [
                {
                    model : UserModel, as : 'user'
                },
                {
                    model : AuthorRequisitesModel
                },
                {
                    model : Topics
                }
            ]})
            return condidate
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getAllAuthors(){
        try {
            const authors : AuthorModel[] = await this.authorRepository.findAll({include : [
                    {
                        model : UserModel, as : 'user'
                    },
                    {
                        model : AuthorRequisitesModel
                    },
                    {
                        model : Topics
                    }
                ], 
                order: [
                    ['id', 'DESC']
                ]
            })
            return authors
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }
    
    async getByID(id : number){
        try {
            const author : AuthorModel = await this.authorRepository.findOne({where : 
                {id : id}, include : [
                    {
                        model : UserModel, as : 'user'
                    },
                    {
                        model : UserModel, as : 'subscribers'
                    },
                    {
                        model : AuthorRequisitesModel
                    },
                    {
                        model : Topics
                    }
                ]
            })
            return author
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async searchAuthor(search : number | string){
        try {
            const data = typeof(search)
            // return {data, search}
            const authors : AuthorModel[] = await this.authorRepository.findAll({where : {} , include : [
                    {
                        model : UserModel, as : 'user', where : {
                            [Op.or] : [
                                {
                                    email : {
                                        [Op.like] : `%${search}%`
                                    }
                                },
                                {
                                    fullName : {
                                        [Op.like] : `%${search}%`
                                    }
                                }
                            ]
                        }
                    }
                ]
            })
            const ddd : AuthorModel [] = await this.authorRepository.findAll({where : {
                id : Number(search)
            }})
            return {authors, ddd}
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }
}

// {
// 	"user": {
// 		"email": "09merdan10@gmail.com",
// 		"id": 2,
// 		"roles": [
// 			"user"
// 		],
// 		"iat": 1651509192,
// 		"exp": 1651595592
// 	},
// 	"authorId": 2
// }