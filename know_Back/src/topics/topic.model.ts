import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { AuthorModel } from "src/authors/models/author.model";
import { AuhtorTopicsModel } from "src/authors/models/author.topics.model";
import { CoursesModel } from "src/courses/models/courses.model";
import { TagsModel } from "src/tags/tags.model";
import { UserTopicModel } from "src/users/modesl/user.topics.model";
import { UserModel } from "src/users/modesl/users.model";

interface TopicCreateAttributes {
    name : string,
    image : string
    isActive : boolean
}

@Table({tableName : "topics"})
export class Topics extends Model<Topics, TopicCreateAttributes> {
    @ApiProperty({example : 1, description : "user ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : "мотивация", description : "topic name"})
    @Column({type : DataType.STRING, allowNull : false})
    name : string;

    @ApiProperty({example : "мотивация", description : "topic name"})
    @Column({type : DataType.BOOLEAN, allowNull : false, defaultValue : true})
    isActive : boolean

    @ApiProperty({example : "5c024227-2720-48ed-85f8-05d3e86c9719.png", description : "topic name"})
    @Column({type : DataType.STRING, unique : true, allowNull : false})
    image : string

    @HasMany( ()=> TagsModel)
    tags : TagsModel[]

    @BelongsToMany( ()=> AuthorModel, () => AuhtorTopicsModel)
    authors : AuthorModel

    @BelongsToMany(() => UserModel, () => UserTopicModel)
    users: UserModel[];

    @HasMany( ()=> CoursesModel)
    courses : CoursesModel[]
}