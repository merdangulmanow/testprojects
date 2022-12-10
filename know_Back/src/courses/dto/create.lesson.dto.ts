import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { LessonTaskDTO } from "./lesson.task.dto";

export class CreateLessonDTO{
    @ApiProperty({example : "Lesson 1", description : "title of lesson"})
    @IsString()
    readonly title : string

    @ApiProperty({example : "sdf234-sdfgs-3sdfgs-2fsdfs.jpg", description : "cover file name, uuid, type : image"})
    @IsString()
    readonly cover : string

    @ApiProperty({example : "sdf234-sdfgs-3sdfgs-2fsdfs.jpg", description : "vide file name, uuid, type : video"})
    @IsString()
    readonly video : string

    @ApiProperty({example : "this is the best course", description : "description of course"})
    @IsString()
    readonly description : string

    @ApiProperty({example : '[20, 50, 140, 200]', description : 'array of time code in seconds'})
    @IsArray()
    readonly timecode : number[]



    @ApiProperty({example : LessonTaskDTO})
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LessonTaskDTO)
    readonly tasks : LessonTaskDTO[]


    
    @ApiProperty({example : "1", description : "course id"})
    @IsNumber()
    readonly courseId : number
}