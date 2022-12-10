import { Body, Controller, Post, UseGuards, Request, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserModel } from 'src/users/modesl/users.model';
import { CreateGroupDTO } from './dto/cretae.group.dto';
import { GroupsService } from './groups.service';
import { GroupModel } from './models/groups.mode';

@ApiTags('groups for messages')
@Controller('groups')
export class GroupsController {
    constructor (private readonly groupService : GroupsService){}

    @ApiOperation({summary : "create group"})
    @ApiResponse({type : GroupModel})
    @UseGuards(JwtAuthGuard)
    @Post()
    createGroup(@Body()dto : CreateGroupDTO, @Request() req){
        const user : UserModel = req.user;
        return this.groupService.createGroup(user, dto)
    }

    @ApiOperation({summary : "get one group"})
    @ApiResponse({type : GroupModel})
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getOneGroup(@Param('id')id : number){
        return this.groupService.getByID(id)
    }

    @ApiOperation({summary : "get one group"})
    @ApiResponse({type : GroupModel})
    @UseGuards(JwtAuthGuard)
    @Get()
    getByUser(@Request() req){
        const user : UserModel = req.user
        return this.groupService.getByUser(user)
    }
}