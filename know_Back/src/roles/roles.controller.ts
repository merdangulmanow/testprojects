import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Roles } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { getAllRolesResponse } from './response/getAllRoles.response';

@ApiTags("роли")
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @ApiOperation({summary: 'создание нового роля'})
    @ApiBody({type: CreateRoleDto, description: 'example of method for create new role'})
    @ApiResponse({status: 201, type : Roles, description : "new role successfully created"})
    @Post()
    createRole(@Body() dto : CreateRoleDto){
        return this.roleService.createRole(dto)
    }

    @ApiOperation({summary: 'получение всех ролей'})
    @ApiResponse({status : 200, isArray : true, schema : {example : getAllRolesResponse}})
    @Get()
    getAllRoles(){
        return this.roleService.getAllRoles()
    }
}