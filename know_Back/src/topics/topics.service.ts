import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTopicDTO } from './dto/create.topic.dto';
import { Topics } from './topic.model';
import {v4} from "uuid"
import { FilesService } from 'src/files/files.service';
import { where } from 'sequelize/types';
import { Op } from 'sequelize';
import { activateTopicDTO } from './dto/enable.topic.dto';
import { TagsService } from 'src/tags/tags.service';
import { TagsModel } from 'src/tags/tags.model';
import { CreateTagDTO, TagsDTO } from 'src/tags/dto/create.tag.dto';
import { editTopicDTO } from './dto/edit.topic.dto';
import { editTagDTO } from 'src/tags/dto/edit.tag.dto';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class TopicsService {
    constructor(
        @InjectModel(Topics) private readonly topicRepository : typeof Topics,
        private readonly helperService : HelperService,
        private readonly tagService : TagsService
    ){}

    async createTopic(dto : CreateTopicDTO){
        try {
            const topic : Topics = await this.topicRepository.create({name : dto.name, image : dto.imageUrl})
            console.log("..............................")
            const createTagDTO : CreateTagDTO = {topicId : topic.id, tags : dto.tags}
            const createdTags : TagsModel[] = await this.tagService.createTags(createTagDTO)

            return {topic : topic, 
                tags : createdTags
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async loadImage(image: any){
        try {
            const fileName = await this.helperService.createFile(image);
            return {fileName}
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async editTopicData(id : number, dto : editTopicDTO, image: any | null){
        try {
            // const data : Topics = await this.getByID(id)
            // if(!data){
            //     throw new HttpException(`cant find this topic, ${id}`, HttpStatus.NOT_FOUND)
            // }
            // data.name = dto.name
            // await data.save();
            // return data
            const topic : Topics = await this.getByID(id)
            if(!topic){
                throw new HttpException(`cant find this topic, ${id}`, HttpStatus.NOT_FOUND)
            }
            if(image){
                const fileName : string = await this.helperService.createFile(image);
                topic.image = fileName
            }
            topic.name = dto.name;
            await topic.save();
            const tagNames : any[] = JSON.parse(dto.tags)
            const tags : editTagDTO[] = [];
            for(let i = 0; i < tagNames.length; i++){
                tags.push({
                    id : tagNames[i].id  | 0,
                    tag : tagNames[i].tag
                });
            }
            console.log(tags)
            await this.tagService.updateManyTags(topic.id, tags)
            const data : Topics = await this.getByID(id)
            return data
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getAll(){
        try {
            const topics : Topics[] = await this.topicRepository.findAll({include : {model : TagsModel}, order : [['id', 'DESC']]})
            return topics
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getByID(id : number){
        try {
            const topic : Topics = await this.topicRepository.findOne({where : {id : id}, include : {model : TagsModel}})
            return topic
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async changeTopicImage(image : any, id : number){
        try {
            const data : Topics = await this.getByID(id)
            if(!data){
                throw new HttpException(`cant find this topic, ${id}`, HttpStatus.NOT_FOUND)
            }
            const fileName = await this.helperService.createFile(image);
            data.image = fileName;
            await data.save()
            return data
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async search(name : string){
        try {
            const topics : Topics[] = await this.topicRepository.findAll({where : {
                name : {
                    [Op.like] : `%${name}%`
                }
            }})
            return topics
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async enableTopics(dto : activateTopicDTO){
        try {
            const topic : Topics = await this.getByID(dto.topicId)
            if(!topic){
                throw new HttpException("can't find this topic", HttpStatus.NOT_FOUND)
            }
            topic.isActive = dto.isActive;
            await topic.save();
            return topic
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }
}