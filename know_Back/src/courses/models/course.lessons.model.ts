import { ApiProperty } from "@nestjs/swagger"
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { LessonTaskDTO } from "../dto/lesson.task.dto"
import { CoursesModel } from "./courses.model"

interface LessonCreateAttributs {
    title : string
    cover : string
    video : string
    description : string
    timecode : number[]
    tasks : LessonTaskDTO[]
}

@Table({tableName : "lessons"})
export class LessonsModel extends Model<LessonsModel, LessonCreateAttributs>{
    @ApiProperty({example : 1, description : "ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : "Lesson 1", description : "title of lesson"})
    @Column({type : DataType.STRING, allowNull : false})
    title : string

    @ApiProperty({example : "sdf234-sdfgs-3sdfgs-2fsdfs.jpg", description : "cover file name, uuid, type : image"})
    @Column({type : DataType.STRING, allowNull : false})
    cover : string

    @ApiProperty({example : "sdf234-sdfgs-3sdfgs-2fsdfs.jpg", description : "vide file name, uuid, type : video"})
    @Column({type : DataType.STRING, allowNull : false})
    video : string

    @ApiProperty({example : "this is the best course", description : "description of course"})
    @Column({type : DataType.TEXT, allowNull : false})
    description : string

    @ApiProperty({example : '[20, 50, 140, 200]', description : 'array of time code in seconds'})
    @Column({type : DataType.ARRAY(DataType.INTEGER), allowNull : false})
    timecode : number[]

    // @ApiProperty({example : [LessonTaskDTO]})
    @Column({type : DataType.JSONB, allowNull : false})
    tasks : LessonTaskDTO[]

    @ForeignKey( ()=> CoursesModel)
    @Column({type : DataType.INTEGER})
    courseId : number
    @BelongsTo( ()=> CoursesModel)
    course : CoursesModel

}
