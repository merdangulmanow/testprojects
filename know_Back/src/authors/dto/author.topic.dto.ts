import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class AuthorTopicDTO {
    @ApiProperty({example : "1", description : "author id"})
    @IsNumber()
    readonly authorId : number

    @ApiProperty({example : "1", description : "topic id"})
    @IsNumber()
    readonly topicId : number
}


// Output folder: C:\Users\User\AppData\Local\Google\Cloud SDK
// Downloading Google Cloud CLI core.
// Extracting Google Cloud CLI core.
// Create Google Cloud CLI bat file: C:\Users\User\AppData\Local\Google\Cloud SDK\cloud_env.bat
// Installing components.
// Welcome to the Google Cloud CLI!
