import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsEnum, IsNumber, IsObject, IsString, ValidateIf, ValidateNested } from "class-validator"
import { courseStylesENUM } from "../enum/course.styles.enum"
import { CreateReviewDTO } from "./create.reviews.dto"


export class CreateCourseDTO {
    @ApiProperty({example : "course name", description : "course name"})
    @IsString()
    readonly name : string

    @ApiProperty({example : "free", description : "enum [free, subscription, paid]"})
    @IsEnum(courseStylesENUM)
    readonly style : courseStylesENUM

    @ApiProperty({example : "sdf234-sdfgs-3sdfgs-2fsdfs.jpg", description : "cover file name, uuid, type : image"})
    @IsString()
    readonly cover : string

    @ApiProperty({example : "2324-sdfsdf-3fds-32fsdf.mp4", description : "trailer file name, uuid, type : video"})
    @IsString()
    readonly trailer : string

    @ApiProperty({example : "this is the best course", description : "description of course"})
    @IsString()
    readonly description : string

    @ApiProperty({example : " [sdf234-sdfgs-3sdfgs-2fsdfs.jpg, sdf234-sdfgs-3sdfgs-2fsdfs.jpg, sdf234-sdfgs-3sdfgs-2fsdfs.jpg] ", description : "вы приобретете"})
    @IsArray()
    readonly acquisition : string[]
    
    @ApiProperty({example : CreateReviewDTO})
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateReviewDTO)
    readonly reviews : CreateReviewDTO[]

    @ApiProperty({example : "[1,2,3,4]", description : "array of topic ID"})
    @IsArray()
    readonly tagId : number[]


    @ApiProperty({example : "1", description : "id of created author"})
    @IsNumber()
    readonly authorId : number

    @ApiProperty({example : "1", description : "id of topic"})
    @IsNumber()
    readonly topicId : number

    // 
    @ApiProperty({example : "100", description : "price of course"})
    @ValidateIf((value)=>value !== null)
    readonly price : number | null

    @ApiProperty({example : "140", description : "price of vip"})
    @ValidateIf((value)=>value !== null)
    readonly vip : number | null
}