import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { authorStatusENUM } from "../enum/author.status.enum";
import { SocialNetworkDTO } from "./social.network.dto";

// enum Gender {
//     MALE = 'male',
//     FEMALE = 'female',
// }

export class ChangeAuthorStatusDTO {
    @ApiProperty({example : "1", description : "author id"})
    @IsNumber()
    readonly authorId : number

    @ApiProperty({example : authorStatusENUM, description : "status ENUM, [pending, accepted, rejected]"})
    @IsEnum(authorStatusENUM, {message: 'status must be authorStatusENUM [pending, accepted, rejected]',})
    readonly status : authorStatusENUM

    @ApiProperty({example : 'I am very good author', description : "author about"})
    @IsString()
    readonly about : string

    @ApiProperty({example : SocialNetworkDTO})
    @ValidateNested({ each: true })
    @Type(() => SocialNetworkDTO)
    social_network : SocialNetworkDTO
}