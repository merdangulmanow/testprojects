import { Body, Controller, Get, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserModel } from 'src/users/modesl/users.model';
import { CoursesService } from './courses.service';
import { ChangeCourseStatusDTO } from './dto/change.course.status.dto';
import { CreateAuthorSheepDTO } from './dto/create.authorsheep.dto';
import { CreateCourseDTO } from './dto/create.course.dto';
import { createCourseTagDTO } from './dto/create.course.tag.dto';
import { CreateLessonDTO } from './dto/create.lesson.dto';
import { LessonsService } from './lessons.service';
import { LessonsModel } from './models/course.lessons.model';
import { CourseTagsModel } from './models/course.tags.model';
import { CoursesModel } from './models/courses.model';
import { createAuthorSheepResponse, createCourseFiles, createLessonFilesResponse } from './response/course.response';

@ApiTags("courses")
@Controller('courses')
export class CoursesController {
    constructor(
        private readonly courseService : CoursesService,
        private readonly lessonService : LessonsService
    ){}

    @ApiOperation({summary : "create new course"})
    @ApiResponse({type : CoursesModel})
    @Post()
    createCourse(@Body()dto : CreateCourseDTO){
        return this.courseService.createCourse(dto)
    }

    @ApiOperation({summary : "uploading files to create a course"})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: { type: 'object',
          properties: {
            cover: { type: 'string', format: 'binary'},
            trailer: { type: 'string', format: 'binary'},
            images: { type: 'string', format: 'binary'},
          },
        },
    })
    @ApiResponse({schema : {example : createCourseFiles}})
    @Post('/images')
    @UseInterceptors(FileFieldsInterceptor([
        {name : 'images', maxCount : 10},
        {name : 'cover', maxCount : 1},
        {name : 'trailer', maxCount : 1},
    ]))
    uploadImages(
        @UploadedFiles() file : {
        images : Express.Multer.File[],
        cover : Express.Multer.File[]
        trailer : Express.Multer.File[]
        }
    ){
        return this.courseService.uploadImages(file)
    }

    @ApiOperation({summary : "создание со автора"})
    @ApiResponse({schema : {example : createAuthorSheepResponse}})
    @Post('/authorsheep')
    createCourseAuthorSheep(@Body() dto : CreateAuthorSheepDTO){
        return this.courseService.createAuthorSheep(dto)
    }

    @ApiOperation({summary : "create lesson"})
    @ApiResponse({type : LessonsModel})
    @Post('/lessons')
    createLesson(@Body()dto : CreateLessonDTO){
        return this.lessonService.createLesson(dto)
    }

    @ApiOperation({summary : "uploading files to create a lesson"})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: { type: 'object',
          properties: {
            cover: { type: 'string', format: 'binary'},
            video: { type: 'string', format: 'binary'}
          },
        },
    })
    @ApiResponse({schema : {example : createLessonFilesResponse}})
    @Post("/lessons/files")
    @UseInterceptors(FileFieldsInterceptor([
        {name : 'cover', maxCount : 1},
        {name : 'video', maxCount : 1}
    ]))
    uploadLessonFiles(
        @UploadedFiles() files : {
            cover : Express.Multer.File[]
            trailer : Express.Multer.File[]
        }
    ){
        return this.lessonService.uploadFiles(files)
    }

    @ApiOperation({summary : "update lesson by ID"})
    @ApiResponse({type : LessonsModel})
    @Put('/lessons/:id')
    updateLesson(@Param('id') id : number, @Body()dto : CreateLessonDTO){
        return this.lessonService.updateLesson(id, dto)
    }

    @ApiOperation({summary : "get lessons by course ID"})
    @ApiResponse({type : [LessonsModel]})
    @Get('/lessons/bycourse/:courseId')
    getLessonsByCourseId(@Param("courseId") courseId : number){
        return this.lessonService.getByCourse(courseId)
    }

    @ApiOperation({summary : "get 1 lessons by ID"})
    @ApiResponse({type : LessonsModel})
    @Get("/lessons/:id")
    getOneLesson(@Param('id') id : number ){
        return this.lessonService.getOneLesson(id)
    }

    @ApiOperation({summary : "change course status"})
    @ApiResponse({type : [CoursesModel]})
    @Put('/status')
    changeCourseStatus(@Body()dto : ChangeCourseStatusDTO){
        return this.courseService.changeCourseStatus(dto)
    }

    // creating new tags to course
    @ApiOperation({summary : "add new tag to course"})
    @ApiResponse({type : CourseTagsModel})
    @Put('/tags')
    addNewTags(@Body() dto : createCourseTagDTO){
        return this.courseService.addTagToCourse(dto)
    }

    @ApiOperation({summary : "update course data"})
    @ApiResponse({type : CoursesModel})
    @Put('/:id')
    editCourse(@Param('id') id : number, @Body() dto : CreateCourseDTO){
        return this.courseService.editCourse(dto, id)
    }

    @ApiOperation({summary : "get all courses"})
    @ApiResponse({type : [CoursesModel]})
    @Get()
    getAllCourses(){
        return this.courseService.getAllCourses()
    }

    @ApiOperation({summary : "get all courses by topic ID"})
    @ApiResponse({type : [CoursesModel]})
    @Get("/topic/:topicId")
    getByTopic(@Param("topicId") topicId : number){
        return this.courseService.getByTopic(topicId)
    }

    @ApiOperation({summary : "get all courses by author ID"})
    @ApiResponse({type : [CoursesModel]})
    @Get("/author/:authorId")
    getByAuthor(@Param("authorId") authorId : number){
        return this.courseService.getByAuthor(authorId)
    }

    @Get('/user/:userId')
    getCoursesByUser(@Param('userId') userId : number){
        return this.courseService.getUserCourses(userId)
    }

    // @UseGuards(JwtAuthGuard)
    @ApiOperation({summary : "get one course by ID"})
    @ApiResponse({type : CoursesModel})
    @Get('/:id')
    getOneCourse(@Param('id') id : number, 
    // @Request() req
    ){
        // const user : UserModel= req.user
        // return user
        return this.courseService.getById(id)
    }
}