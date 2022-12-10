import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, Get, Param, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create.post.dto';
import { PostModel } from './models/posts.model';
import { PostsService } from './posts.service';
import { getAllPosts } from './response/post.response';

@ApiBearerAuth('token')
@ApiTags("posts")
@Controller('posts')
export class PostsController {
    constructor(private readonly postService : PostsService){}

    @ApiOperation({summary : "create new post"})
    @ApiResponse({type : PostModel})
    @UseGuards(JwtAuthGuard)
    
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            file: {
                type: 'string',
                format: 'binary',
            },
        },
        },
    })
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createPost(
        @Body() dto: CreatePostDto,
        @UploadedFile() file : any | null,
        @Request() req
    ){
        const user = req.user
        return this.postService.createPost(dto, file, user)
    }

    @ApiOperation({summary : "Get all post"})
    @ApiResponse({schema : {example : getAllPosts}})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllPosts(){
        return this.postService.getAll()
    }
    
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary : "Get 1 user's all posts"})
    @ApiResponse({schema : {example : getAllPosts}})
    @Get('/:userId')
    getByUser(@Param('userId') userId : number){
        return this.postService.getByUser(userId)
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('/:postId')
    @UseInterceptors(FileInterceptor('file'))
    editPost(
        @Body() dto: CreatePostDto,
        @UploadedFile() file : any | null,
        @Param('postId') postId : number,
        @Request() req
    ){
        console.log(`.................................${postId}`)
        const user = req.user
        return this.postService.editPost(postId, dto, file, user)
    }

}