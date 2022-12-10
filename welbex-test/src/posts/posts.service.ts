import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HelperService } from 'src/helper/helper.service';
import { UserModel } from 'src/users/models/user.model';
import { CreatePostDto } from './dto/create.post.dto';
import { PostModel } from './models/posts.model';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(PostModel) private readonly postRepository : typeof PostModel,
        private readonly helperService : HelperService
    ){}

    async createPost(dto: CreatePostDto, file: any, user : UserModel) {
        try {
            var post : PostModel; 
            if(file){
                const filename = await this.helperService.createFile(file);
                post = await this.postRepository.create({...dto, filename: filename, userId : user.id})
                return post;
            }
            post = await this.postRepository.create({...dto, userId : user.id})
            return post;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getAll(){
        try {
            const posts : PostModel[] = await this.postRepository.findAll({
                include : [
                    {
                        model : UserModel, attributes : ['id', 'name']
                    }
                ],
                order: [['id', 'DESC']]
            })
            return posts
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getByUser(userId : number){
        try {
            const posts : PostModel[] = await this.postRepository.findAll({
                where : {userId : userId},
                include : [
                    {
                        model : UserModel, attributes : ['id', 'name']
                    }
                ],
                order: [['id', 'DESC']]
            })
            return posts
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async editPost(postId : number, dto : CreatePostDto, file : any | null, user : UserModel){
        try {
            const condidate : PostModel = await this.postRepository.findOne({where : {id : postId}})
            if(!condidate || condidate.userId != user.id){
                throw new HttpException("can't find this post", HttpStatus.CONFLICT)
            }
            if(file){
                const filename = await this.helperService.createFile(file);
                condidate.filename = filename
            }
            if(dto.content){
                condidate.content = dto.content
            }
            condidate.title = dto.title;
            await condidate.save()
            return condidate
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }
    
}