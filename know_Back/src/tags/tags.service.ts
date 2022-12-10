import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateTagDTO } from './dto/create.tag.dto';
import { editTagDTO } from './dto/edit.tag.dto';
import { TagsModel } from './tags.model';

@Injectable()
export class TagsService {
    constructor (
        @InjectModel(TagsModel) private readonly tagRepository : typeof TagsModel
    ) {}

    async createTags(dto : CreateTagDTO){
        try {
            const values = []
            for(let i = 0; i < dto.tags.length; i++){
                values.push({
                    topicId : dto.topicId,
                    tag : dto.tags[i]
                })
            }
            const tags : TagsModel[] = await this.tagRepository.bulkCreate(values)
            return tags
        } catch (err) {
            throw new HttpException(err.messsage, HttpStatus.BAD_REQUEST)
        }
    }

    async updateManyTags(topicId : number, dto : editTagDTO[]){
        try {
            for(let i = 0; i < dto.length; i ++){
                console.log("........................................."+dto[i].id)
                const tag : TagsModel = await this.getOneTag(dto[i].id)
                if(tag){
                    tag.tag = dto[i].tag
                    await tag.save()
                } else {
                    await this.tagRepository.create({tag : dto[i].tag, topicId : topicId})
                }
            }
        } catch (err) {
            throw new HttpException(err.messsage, HttpStatus.BAD_REQUEST)
        }
    }

    async findTag(search : string){
        try {
            const condidates : TagsModel[] = await this.tagRepository.findAll({where : {
                tag : {
                    [Op.like] : `%${search}%`
                }
            }})
            return condidates
        } catch (err) {
            throw new HttpException(err.messsage, HttpStatus.BAD_REQUEST)
        }
    }

    private async getOneTag(id :number){
        try {
            const tag : TagsModel = await this.tagRepository.findOne({where : {id : id}})
            return tag
        } catch (err) {
            throw new HttpException(err.messsage, HttpStatus.BAD_REQUEST)
        }
    }
}