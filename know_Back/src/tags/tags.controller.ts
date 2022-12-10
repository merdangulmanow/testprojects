import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagsModel } from './tags.model';
import { TagsService } from './tags.service';

@ApiTags("теги")
@Controller('tags')
export class TagsController {
    constructor(private tagsService : TagsService){}

    @HttpCode(200)
    @ApiOperation({ summary: 'поиск тега' }) 
    @ApiQuery({name: 'search', required: true, explode: false, type: String})
    @ApiResponse({status : 200, type : [TagsModel]})
    @Get('/:search')
    searchTag(@Param('search') search : string){
        return this.tagsService.findTag(search)
    }

}