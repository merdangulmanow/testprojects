import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { TagsModel } from "src/tags/tags.model";
import { CoursesModel } from "./courses.model";

interface CourseTagsCreateAttributes{
    courseId : number
    tagId : number
}

@Table({tableName : 'course_tags'})
export class CourseTagsModel extends Model<CourseTagsModel, CourseTagsCreateAttributes>{
    @ApiProperty({example : 1, description : "ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : 1, description : "role id"})
    @ForeignKey(() => CoursesModel)
    @Column({type: DataType.INTEGER})
    courseId: number;

    @ApiProperty({example : 1, description : "user id"})
    @ForeignKey(() => TagsModel)
    @Column({type: DataType.INTEGER})
    tagId: number;
}