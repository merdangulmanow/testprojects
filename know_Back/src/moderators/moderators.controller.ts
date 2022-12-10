import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ChangeStatusDTO } from './dto/change.status.dto';
import { CreateModeratorDTO } from './dto/moderator.create.dto';
import { ModeratorModel } from './moderators.model';
import { ModeratorsService } from './moderators.service';
import createModeratorResponse from './response/create.moderator.response';

@ApiTags("moderators")
@Controller('moderators')
export class ModeratorsController {
    constructor(private readonly moderatorService : ModeratorsService){}

    @ApiOperation({summary: 'создание модератора'})
    @ApiResponse({schema : {example : createModeratorResponse}})
    @Post()
    @UseGuards(JwtAuthGuard)
    toBoModerator(@Body() dto : CreateModeratorDTO){
        return this.moderatorService.toBoModerator(dto)
    }

    @ApiOperation({summary: 'изменение статуса модератора'})
    @ApiResponse({type : ModeratorModel})

    @Put('/status')
    @UseGuards(JwtAuthGuard)
    // @Roles("admin")
    // @UseGuards(RolesGuard)
    changeStatus(@Body() dto : ChangeStatusDTO){
        return this.moderatorService.changeStatus(dto)
    }
}   