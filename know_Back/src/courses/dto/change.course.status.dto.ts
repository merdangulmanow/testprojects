import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber } from "class-validator";
import { courseStatusENUM } from "../enum/course.status.enum";

export class ChangeCourseStatusDTO {
    @ApiProperty({example : 1, description : "id of course"})
    @IsNumber()
    readonly courseId : number

    @ApiProperty({example : "draft", description : "enum [free, subscription, paid]"})
    @IsEnum(courseStatusENUM)
    readonly status : courseStatusENUM
}