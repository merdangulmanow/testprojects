import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CourseTagsModel } from "src/courses/models/course.tags.model";
import { CoursesModel } from "src/courses/models/courses.model";
import { Topics } from "src/topics/topic.model";

interface TagCreationAttributes {
    topicId : number;
    tag : string
}

@Table({tableName : "tags", createdAt : false})
export class TagsModel extends Model<TagsModel, TagCreationAttributes>{
    @ApiProperty({example : 1, description : "ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : "Мотивация", description : "tag name"})
    @Column({type : DataType.STRING, allowNull : false})
    tag : string;

    @ForeignKey( ()=>Topics)
    @Column({type : DataType.INTEGER})
    topicId : number
    @BelongsTo( ()=> Topics)
    topic : Topics

    @BelongsToMany(()=> CoursesModel, ()=>CourseTagsModel)
    courses : CoursesModel
}