import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class LessonTaskDTO{
    @ApiProperty({example : "Task 1", description : 'Title of task'})
    @IsString()
    readonly headline : string

    @ApiProperty({example : "???", description : "description on task"})
    @IsString()
    readonly description : string
}