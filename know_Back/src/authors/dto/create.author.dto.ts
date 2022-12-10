import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsObject, IsString, ValidateIf } from "class-validator";

export class CreateAuthorDTO {

    @ApiProperty({example : "user@gmail.com", description : "email of user | admin"})
    @IsEmail()
    readonly email : string

    @ApiProperty({example : "Jano Doe", description : "full name of user | admin"})
    @IsString()
    readonly fullName : string

    @ApiProperty({example : "adsafjkadfsafs.jpg", description : "user | author avatar"})
    @IsString()
    readonly avatar : string

    ///// author data
    @ApiProperty({example : 'I am very good author', description : "author about"})
    @IsString()
    readonly about : string

    @ApiProperty({example : "topic name by author", description : "description of topic"})
    @IsString()
    readonly topic_string : string

    //// social data
    @ApiProperty({example : "https://instagram.com/asdflsadf", description : "link to instagram, CAN BE NULL"})
    @ValidateIf((value)=>value !== null)
    readonly instagramLink : string | null

    @ApiProperty({example : 123, description : "instagram Followers count, CAN BE NULL"})
    @ValidateIf((value)=>value !== null)
    readonly instagramFollowers : number | null

    @ApiProperty({example : "https://youtube.com/asdflsadf", description : "link to youtube, CAN BE NULL"})
    @ValidateIf((value)=>value !== null)
    readonly youtubeLink : string | null

    @ApiProperty({example : 123, description : "youtube Followers count, CAN BE NULL"})
    @ValidateIf((value)=>value !== null)
    readonly youtubeFollowers : number | null

}