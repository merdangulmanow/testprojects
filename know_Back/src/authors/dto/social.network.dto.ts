import { ApiProperty } from "@nestjs/swagger";
import { ValidateIf } from "class-validator";

export class SocialNetworkDTO {
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