import { Body, Controller, Post, UseGuards, Request, Put, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiProduces, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserModel } from 'src/users/modesl/users.model';
import { AuthorRequisitesService } from './author.requisites.service';
import { AuthorsService } from './authors.service';
import { AuthorTopicDTO } from './dto/author.topic.dto';
import { ChangeAuthorStatusDTO } from './dto/change.author.status.dto';
import { CreateAuthorDTO } from './dto/create.author.dto';
import { CreateRequisitesDTO } from './dto/create.requisites.dto';
import { AuthorModel } from './models/author.model';
import { AuthorRequisitesModel } from './models/author.requisites.model';
import { AuhtorTopicsModel } from './models/author.topics.model';

@ApiTags("авторы")
@Controller('authors')
export class AuthorsController {
    constructor(
        private readonly authorService : AuthorsService,
        private readonly requistiesService : AuthorRequisitesService
    ){}

    @ApiOperation({summary: 'создание автора'})
    @ApiResponse({type: AuthorModel})

    @Post()
    @UseGuards(JwtAuthGuard)
    toBeAuthor(@Body() dto : CreateAuthorDTO, @Request() req, ){
        const user : UserModel= req.user
        return this.authorService.toBeAuthor(user, dto)
    }

    @ApiOperation({summary: 'изменение статуса автора'})
    @ApiResponse({type: AuthorModel})

    @Put('/update')
    changeStatus(@Body() dto : ChangeAuthorStatusDTO){
        return this.authorService.changeStatus(dto)
    }

    @ApiOperation({summary : "добавление реквизитов автора"})
    @ApiOkResponse({type : AuthorRequisitesModel})

    @Post('/requisites')
    createAuthorRequisites(@Body() dto : CreateRequisitesDTO){
        return this.requistiesService.create(dto)
    }

    @ApiOperation({summary : "добавление реквизитов автора"})
    @ApiOkResponse({type : AuhtorTopicsModel})
    @Post('/topic')
    createAuthorTopic(@Body() dto : AuthorTopicDTO){
        return this.authorService.createAuthorTopic(dto)
    }

    // @ApiOperation({summary : "follow author"})
    // @ApiResponse({schema : {example : followerResponse}})
    // @Post('/follow/:authorId')
    // @UseGuards(JwtAuthGuard)
    // followAuthor(@Param('authorId') authorId : number, @Request() req){
    //     const user : UserModel= req.user
    //     return this.authorService.followAuthor(authorId, user)
    // }

    @ApiOperation({summary : "search by email or id or name"})
    @ApiResponse({type : AuthorModel})
    @Post('/search/:search')
    searchAuthor(@Param('search') search : number | string){
        return this.authorService.searchAuthor(search)
    }

    @Put('/topic/:id')
    editAuthorTopic(@Body() dto : AuthorTopicDTO, @Param('id') id : number){
        return this.authorService.editAuthorTopic(id, dto)
    }

    @ApiOperation({summary : "редактирование реквизитов автора"})
    @ApiOkResponse({type : AuthorRequisitesModel})
    @Put('/requisites/edit')
    editAuthorRequisites(@Body() dto : CreateRequisitesDTO){
        return this.requistiesService.editRequests(dto)
    }

    @ApiOperation({summary : "получение всех авторов"})
    @ApiResponse({type : [AuthorModel]})
    @Get()
    getAllAuthors(){
        return this.authorService.getAllAuthors()
    }

    @ApiOperation({summary : "получение реквизитов автора"})
    @ApiOkResponse({type : AuthorRequisitesModel})
    @ApiQuery({name: 'authorId', required: true, explode: false, type: Number})
    @Get("/requisites/:authorId")
    requisitesByAuthorId(@Param('authorId') authorId : number){
        return this.requistiesService.getOne(authorId)
    }

    @ApiOperation({summary : "получение одного авторова по ID"})
    @ApiResponse({type : AuthorModel})
    @Get('/:id')
    getOneAuthor(@Param('id') id : number){
        return this.authorService.getByID(id)
    }

} 