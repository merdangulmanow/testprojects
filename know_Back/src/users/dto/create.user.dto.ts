import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsBoolean, IsArray } from "class-validator";

export class createUserDTO{
    @ApiProperty({example: 'user@mail.ru', description: 'email'})
    @IsEmail()
    readonly email : string

    @ApiProperty({example: 'John Smith', description: "user's full name"})
    @IsString()
    readonly fullName : string

    @ApiProperty({example: '[1,2,3]', description: 'array of topic id'})
    @IsArray()
    readonly topicId : number[]

    // @ApiProperty({example: 'true', description: "is user validate this email?"})
    // @IsBoolean()
    // readonly validated  : boolean
}