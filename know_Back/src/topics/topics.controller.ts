import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiHeader, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTopicDTO } from './dto/create.topic.dto';
import { editTopicDTO } from './dto/edit.topic.dto';
import { activateTopicDTO } from './dto/enable.topic.dto';
import {createTopicAndTags, getAllTopicsResponse, setTopicImageResponse} from './response/topics.response';
import { Topics } from './topic.model';
import { TopicsService } from './topics.service'

@ApiTags("topics Сферы")
@Controller('topics')
export class TopicsController {
    constructor(private topicService : TopicsService){}

    @ApiOperation({summary: 'создание сферы и тегов'})
    @ApiBody({type : CreateTopicDTO, description : "example of method for create new topic"})
    @ApiResponse({status: 201, schema : {example : createTopicAndTags}, description : "successfully created", })
    @Post()
    createPost(@Body() dto: CreateTopicDTO) {
        return this.topicService.createTopic(dto)
    }

    @ApiOperation({summary: 'добавление фотографии для сферы'})
    @ApiResponse({ status : 201, schema : {example : setTopicImageResponse}})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description : "multipart/form-data, key : image, type : file",
        required: true,
        schema: {
          type: 'object',
          properties: {
            image: {
              type: 'file',
              format: 'file',
              maxItems : 1,
            },
          },
        },
      })
    @Post("/image")
    @UseInterceptors(FileInterceptor('image'))
    loadImage(@UploadedFile() image : any): Promise<{ fileName: string; }>{
        return this.topicService.loadImage(image)
    }

    @ApiOperation({summary: 'получение всех сфер'})
    @ApiResponse({ status : 200, isArray : true, schema : {example : getAllTopicsResponse} })
    @Get()
    getAllTopics(){
        return this.topicService.getAll()
    }

    @ApiOperation({ summary: 'поиск сферы но имени' }) 
    @ApiQuery({name: 'name', required: true, explode: false, type: String})
    @ApiResponse({status : 200, isArray : true, type : [Topics]})
    @Get('/search')
    searchByName(@Query('name') name : string){
        return this.topicService.search(name)
    }

    @ApiOperation({ summary: 'получени сферы по ID' }) 
    @ApiResponse({ status : 200, schema : {example : getAllTopicsResponse[0]}, description : "get one topic by ID and his tags"})
    @ApiParam({name: 'id', description: 'Gets the topics by id',})
    @Get('/:id')
    getOneTopic(@Param("id") id : number){
        return this.topicService.getByID(id)
    }

    @HttpCode(201)
    @ApiOperation({ summary: 'смена статуса сферы' }) 
    @ApiResponse({status : 201, type : Topics})
    @ApiBody({type : activateTopicDTO})
    @Put('/activate')
    activateTopic(@Body() dto : activateTopicDTO){
        return this.topicService.enableTopics(dto)
    }

    // @HttpCode(200)
    // @ApiParam({name: 'id', description: 'Update topic and tags'})
    // @ApiOperation({ summary: 'редактирование сферы и тегов' }) 
    // @ApiResponse({status : 200, type : Topics})
    // @ApiBody({type : editTopicDTO})
    // @Put('/:id')
    // @UseInterceptors(FileInterceptor('image'))
    // editTopicData(@Param("id") id : number, @Body() dto: editTopicDTO, @UploadedFile() image : any | null){
    //     return this.topicService.editTopicData(id, dto, image)
    // }

    // @Put('/image/:id')
    // editTopicImage(@Param("id") id : number, @UploadedFile() image ){
    //     return this.topicService.changeTopicImage(id, image)
    // }
    
}