import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
// import { RolesGuard } from 'src/auth/roles.guard';
import { CreateHostDTO } from './dto/create.host.dto';
import { refreshTokenDTO } from './dto/refresh.token.dto';
import { HostsService } from './hosts.service';
import { HostsGuard } from './jwt-host-guard';
import hostCreateResponse from './response/host.create.response';

@ApiTags("hosts")
@Controller('hosts')
export class HostsController {
    constructor(private readonly hostService : HostsService){}

    @ApiOperation({summary : 'create new host'})
    @ApiResponse({schema : {example : hostCreateResponse}})
    @Post('/create')
    createHost(@Body() dto : CreateHostDTO){
        return this.hostService.createHost(dto)
    }

    @ApiOperation({summary : 'host login'})
    @ApiResponse({schema : {example : hostCreateResponse}})
    @Post('/login')
    loginHost(@Body() dto : CreateHostDTO){
        return this.hostService.loginHost(dto)
    }

    @ApiOperation({summary : 'refresh tokens by refresh_token'})
    @ApiResponse({schema : {example : hostCreateResponse}})
    @Post('/refresh')
    // @UseGuards(HostsGuard)
    refreshToken(@Body() dto : refreshTokenDTO){
        return this.hostService.refreshToken(dto)
    }
}