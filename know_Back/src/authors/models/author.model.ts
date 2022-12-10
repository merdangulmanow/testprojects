import { ApiProperty } from "@nestjs/swagger"
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript"
import { courseAuthorsheepModel } from "src/courses/models/course.authorsheep.model"
import { CoursesModel } from "src/courses/models/courses.model"
import { Topics } from "src/topics/topic.model"
import { UserModel } from "src/users/modesl/users.model"
import { SocialNetworkDTO } from "../dto/social.network.dto"
import { authorStatusENUM } from "../enum/author.status.enum"
import { AuthorRequisitesModel } from "./author.requisites.model"
import { AuhtorTopicsModel } from "./author.topics.model"

interface AuthorCreateAttributes {
    userId : number
    about : string
    social_network : SocialNetworkDTO,
    topic_string : string
}

@Table({tableName : "authors"})
export class AuthorModel extends Model<AuthorModel, AuthorCreateAttributes> {
    @ApiProperty({example : 1, description : "ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : 'I am very good author', description : "author about"})
    @Column({type : DataType.TEXT, allowNull : false})
    about : string

    @ApiProperty({example : 'Text about the activity of the author', description : "Text about the activity of the author"})
    @Column({type : DataType.STRING, allowNull : false})
    topic_string : string

    @ApiProperty({example : "pending", description : "status ENUM, [pending, accepted, rejected]"})
    @Column({type : DataType.ENUM, values : ['pending', 'accepted', 'rejected'], defaultValue : authorStatusENUM.pending, allowNull : false })
    status : authorStatusENUM


    @Column({type : DataType.JSONB, allowNull : false})
    social_network : SocialNetworkDTO

    @ForeignKey( ()=>UserModel)
    @ApiProperty({example : 1, description : "id of user"})
    @Column({type : DataType.INTEGER})
    userId : number
    @BelongsTo(() => UserModel)
    user: UserModel

    @HasOne( ()=> AuthorRequisitesModel)
    authorRequisites : AuthorRequisitesModel

    @HasMany( ()=> CoursesModel)
    courses : CoursesModel[]

    @BelongsToMany( ()=> Topics, () => AuhtorTopicsModel)
    topics : Topics[]

    @BelongsToMany( ()=> CoursesModel, ()=> courseAuthorsheepModel)
    authorsheepCourses : CoursesModel
    
}