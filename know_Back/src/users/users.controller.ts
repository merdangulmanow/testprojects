import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createUserDTO } from './dto/create.user.dto';
import { createUserTopicDTO } from './dto/create.user.topic.dto';
import { UserTopicModel } from './modesl/user.topics.model';
import { UserModel } from './modesl/users.model';
import { UsersService } from './users.service';

@ApiTags('App users')
@Controller('users')
export class UsersController {
    constructor(
        private userService : UsersService,
    ){}

    @ApiOperation({summary: 'добавление сфер'})
    @ApiResponse({status: 201, type: [UserTopicModel]})
    @Post('/topics')
    setTopics(@Body() dto : createUserTopicDTO){
        return this.userService.addTopicToUser(dto)
    }

    @ApiOperation({summary: 'добавление аватарки'})
    @ApiResponse({status: 201, type: UserTopicModel})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description : "multipart/form-data, key : avatar, type : file",
        schema: {
          type: 'object',
          properties: {
            avatar: {
              type: 'file',
              format: 'file',
            },
          },
        },
      })
    @Post('/avatar')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('avatar'))
    changeAvatar( @UploadedFile() avatar : any, @Request() req ){
        const user : UserModel= req.user
        return this.userService.changeAvatar(avatar, user)
    }

    @Get('/courses/user/:userId')
    // @UseGuards(JwtAuthGuard)
    getCourses(
      // @Request() req
      @Param('userId') userId : number
    ){
      return this.userService.getUserById(userId)
    }
    
    
}