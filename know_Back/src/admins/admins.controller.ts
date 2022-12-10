import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import loginHostResponse from 'src/authors/response/host.login.response';
import { AdminModel } from './admin.model';
import { AdminsService } from './admins.service';
import { checkCodeDTO } from './dto/check.code.dto';
import { AdminCreateDTO } from './dto/create.admin.dto';
import { loginHost } from './dto/login.host.dto';

@ApiTags("админы")
@Controller('admins')
export class AdminsController {
    constructor(private adminService : AdminsService){}

    @ApiOperation({summary: 'регистрация админа, хоста'})
    @ApiResponse({type: AdminModel})
    @Post('/registration')
    registrAdminHost(@Body() dto : AdminCreateDTO){
        return this.adminService.registrAdminHost(dto)
    }

    @ApiOperation({summary: 'логин хоста'})
    @ApiResponse({schema: {example : loginHostResponse}})
    @Post('/login')
    loginHost(@Body() dto : loginHost){
        return this.adminService.login(dto)
    }


    @ApiOperation({summary: 'логин хоста'})
    @ApiResponse({schema: {example : loginHostResponse}})
    @Post('/check')
    checkCode(@Body() dto : checkCodeDTO){
        return this.adminService.checkCode(dto)
    }


    @ApiOperation({summary: 'получение всех админов, хостов'})
    @ApiResponse({type: [AdminModel]})
    @Get()
    getAllAdminHost(){
        return this.adminService.getAll()
    }
}