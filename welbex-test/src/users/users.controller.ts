import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserModel } from './models/user.model';
import { UserAndHisPosts } from './response/user.response';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService){}

    @ApiOperation({summary: 'to get all users'})
    @ApiResponse({type : [UserModel], isArray : true})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'to one user and his posts by jwt'})
    @ApiResponse({schema : {example : UserAndHisPosts}})
    @UseGuards(JwtAuthGuard)
    @Get('/one')
    getOneUser(@Request() req){
        const userId : number = req.user.id
        return this.userService.getOneUsers(userId)
    }
}