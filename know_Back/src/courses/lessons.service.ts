import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { HelperService } from "src/helper/helper.service";
import { CreateLessonDTO } from "./dto/create.lesson.dto";
import { LessonsModel } from "./models/course.lessons.model";


@Injectable()
export class LessonsService  {
    constructor(
        @InjectModel(LessonsModel) private readonly lessonsRepositoy : typeof LessonsModel,
        private readonly helperService : HelperService
    ){}

    async createLesson(dto : CreateLessonDTO){
        try {
            const lesson : LessonsModel = await this.lessonsRepositoy.create(dto)
            return lesson
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async deleteLesson(id : number){
        try {
            await this.lessonsRepositoy.destroy({where : {id : id}})
            return {message : `${id} deleted`}
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async updateLesson(id : number, dto : CreateLessonDTO){
        try {
            const condidate : LessonsModel = await this.lessonsRepositoy.findOne({where : {id : id, courseId : dto.courseId}})
            if(!condidate){
                throw new HttpException("can't find this lesson", HttpStatus.NOT_FOUND)
            }
            condidate.tasks = dto.tasks
            condidate.title = dto.title
            condidate.cover = dto.cover
            condidate.video = dto.video
            condidate.description = dto.description
            condidate.timecode = dto.timecode
            await condidate.save()
            return condidate
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getOneLesson(id : number){
        try {
            const lesson : LessonsModel = await this.lessonsRepositoy.findOne({where : {id : id}})
            return lesson
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getByCourse(coruseId : number){
        try {
            const lessons : LessonsModel[] = await this.lessonsRepositoy.findAll({where : {courseId : coruseId}})
            return lessons
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async uploadFiles(files){
        try {
            const cover : string = await this.helperService.createLessonFiles(files.cover[0])
            const video : string = await this.helperService.createLessonFiles(files.video[0])
            return {cover, video}
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }
}