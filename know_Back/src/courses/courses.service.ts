import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { AuthorsService } from 'src/authors/authors.service';
import { AuthorModel } from 'src/authors/models/author.model';
import { FilesService } from 'src/files/files.service';
import { HelperService } from 'src/helper/helper.service';
import { Topics } from 'src/topics/topic.model';
import { UserModel } from 'src/users/modesl/users.model';
import { UsersService } from 'src/users/users.service';
import { ChangeAuthorSheepStatusDTO } from './dto/authorsheep.status.dto';
import { ChangeCourseStatusDTO } from './dto/change.course.status.dto';
import { CreateAuthorSheepDTO } from './dto/create.authorsheep.dto';
import { CreateCourseDTO } from './dto/create.course.dto';
import { createCourseTagDTO } from './dto/create.course.tag.dto';
import { authorsheepENUM } from './enum/authorsheep.enum';
import { CourseChargeableModel } from './models/coruse.chargeable.model';
import { courseAuthorsheepModel } from './models/course.authorsheep.model';
import { LessonsModel } from './models/course.lessons.model';
import { CourseTagsModel } from './models/course.tags.model';
import { CoursesModel } from './models/courses.model';

@Injectable()
export class CoursesService {

    constructor(
        @InjectModel(CoursesModel) private readonly courseRepository : typeof CoursesModel,
        @InjectModel(CourseTagsModel) private readonly courseTagsRepository : typeof CourseTagsModel,
        @InjectModel(courseAuthorsheepModel) private readonly authorSheepRepository : typeof courseAuthorsheepModel,
        @InjectModel(CourseChargeableModel) private readonly chargeableRepository : typeof CourseChargeableModel,
        private readonly helperService : HelperService,
        private readonly authorService : AuthorsService,
        private readonly userService : UsersService
    ){}
    
    async uploadImages(file){
        const acquisition : string[] = await this.helperService.createMultiFiles(file.images)
        const cover : string = await this.helperService.createCourseCoverTrailer(file.cover[0], 'cover')
        const trailer : string = await this.helperService.createCourseCoverTrailer(file.trailer[0], 'trailer')
        return {acquisition, cover, trailer}
    }

    async createCourse(dto : CreateCourseDTO){
        try {
            const condidate : CoursesModel = await this.courseExists(dto.topicId, dto.name, dto.authorId)
            if(condidate){
                throw new HttpException("this course already exists", HttpStatus.CONFLICT)
            }
            const course : CoursesModel = await this.courseRepository.create(dto)
            var authorTags = [];
            for(let i =0; i< dto.tagId.length; i++){
                authorTags.push({
                    courseId : course.id,
                    tagId : dto.tagId[i]
                })
            }
            await this.courseTagsRepository.bulkCreate(authorTags)
            if(dto.price && dto.vip && dto.style == "paid"){
                await this.chargeableRepository.create({price : dto.price, vip : dto.vip, courseId : course.id})
            }
            return course
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async editCourse(dto : CreateCourseDTO, id : number){
        try {
            const condidate : CoursesModel = await this.getById(id)
            if(!condidate){
                throw new HttpException("can't find this course", HttpStatus.NOT_FOUND)
            }
            condidate.name = dto.name;
            condidate.acquisition = dto.acquisition
            condidate.cover = dto.cover
            condidate.trailer = dto.trailer
            condidate.style = dto.style
            condidate.topicId = dto.topicId
            condidate.reviews = dto.reviews
            condidate.description = dto.description
            await condidate.save()
            return condidate
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async courseExists(topicId : number, name : string, authorId : number){
        try {
            const condidate : CoursesModel = await this.courseRepository.findOne({where : {
                topicId : topicId, name : name, authorId : authorId
            }})
            return condidate
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getAllCourses(){
        try {
            const courses : CoursesModel[] = await this.courseRepository.findAll({
                include : [
                    {
                        model : Topics
                    },
                    {
                        model : AuthorModel,
                        as : 'author',
                        include : [
                            {
                                model : UserModel,
                                attributes : ['id', 'fullName', 'email', 'avatar']
                            }
                        ]
                    },
                    {
                        model : AuthorModel,
                        as : 'co_author',
                        include : [
                            {
                                model : UserModel,
                                attributes : ['id', 'fullName', 'email', 'avatar']
                            }
                        ]
                    },
                ],
                order: [
                    ['status', 'DESC'],
                    ['style', 'DESC']
                ]
            })
            return courses
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getByTopic(topicId : number){
        try {
            const courses : CoursesModel[] = await this.courseRepository.findAll({where : 
                {topicId : topicId}, 
                include : [
                    {
                        model : Topics
                    },
                    {
                        model : AuthorModel,
                        as : 'co_author',
                        include : [
                            {
                                model : UserModel,
                                attributes : ['id', 'fullName', 'email', 'avatar']
                            }
                        ]
                    },
                    {
                        model : AuthorModel,
                        as : 'author',
                        include : [
                            {
                                model : UserModel,
                                attributes : ['id', 'fullName', 'email', 'avatar']
                            }
                        ]
                    },
                ],
                order: [
                    ['status', 'DESC'],
                    ['style', 'DESC']
                ]
            })
            return courses
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getByAuthor(authorId: number){
        try {
            const courses : CoursesModel[] = await this.courseRepository.findAll({where : 
                {authorId : authorId}, include : [
                    {
                        model : Topics
                    },
                    {
                        model : AuthorModel,
                        as : 'co_author',
                        include : [
                            {
                                model : UserModel,
                                attributes : ['id', 'fullName', 'email', 'avatar']
                            }
                        ]
                    },
                    {
                        model : AuthorModel,
                        as : 'author',
                        include : [
                            {
                                model : UserModel,
                                attributes : ['id', 'fullName', 'email', 'avatar']
                            }
                        ]
                    },
                ],
                order: [
                    ['status', 'DESC'],
                    ['style', 'DESC']
                ]
            })
            return courses
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getById(id : number){
        try {
            const course : CoursesModel = await this.courseRepository.findOne({where : 
                {id : id},
                include : [
                    {model : LessonsModel}
                ],
                order: [
                    ['status', 'DESC'],
                    ['style', 'DESC']
                ]
            })
            return course
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }


    async changeCourseStatus(dto : ChangeCourseStatusDTO){
        try {
            const course: CoursesModel = await this.getById(dto.courseId)
            if(!course){
                throw new HttpException("can't find this course", HttpStatus.NOT_FOUND)
            }
            course.status = dto.status;
            await course.save()
            return course
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async addTagToCourse(dto : createCourseTagDTO){
        try {
            const data = await this.courseTagsRepository.findOrCreate({where:{
                courseId : dto.courseId, tagId : dto.tagId
                }
            })
            return data
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async deleteTagFomCourse(id:number){
        try {
            await this.courseTagsRepository.destroy({where : {id : id}})
            return {message : `deleted id ${id}`}
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async createAuthorSheep(dto : CreateAuthorSheepDTO){
        try {
            const course : CoursesModel = await this.courseRepository.findOne({where : {authorId : dto.authorId, id : dto.courseId}})
            const author : AuthorModel = await this.authorService.getByAuthorID(dto.authorId)
            if(course || author.status != 'accepted'){
                throw new HttpException('you are author of this course OR this author is not accepted', HttpStatus.CONFLICT)
            }
            const condidate : courseAuthorsheepModel = await this.authorSheepRepository.findOne({where : {authorId : dto.authorId, courseId : dto.courseId}})
            if(condidate){
                if(condidate.status != authorsheepENUM.waiting){
                    condidate.status = authorsheepENUM.waiting
                    await condidate.save()
                }
                return condidate
            }
            const authorSheep : courseAuthorsheepModel = await this.authorSheepRepository.create(dto)
            return authorSheep
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async changeAuthorSheepStatus(dto : ChangeAuthorSheepStatusDTO, userId : number){
        try {
            
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserCourses(userId : number){
        try {
            const user : UserModel = await this.userService.getUserById(userId)
            var topics : number[] = [];
            for(let i : number = 0; i < user.topics.length; i++){
                topics.push(user.topics[i].id)
            }
            const courses : CoursesModel[] = await this.courseRepository.findAll({where : {topicId : 
                {
                    [Op.or] : [topics]
                }
            }})
            return courses
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    

}