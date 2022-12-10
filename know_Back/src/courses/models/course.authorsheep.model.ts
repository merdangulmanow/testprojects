import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { AuthorModel } from "src/authors/models/author.model";
import { authorsheepENUM } from "../enum/authorsheep.enum";
import { CoursesModel } from "./courses.model";


interface courseAuthorsheepCreateAttributes {
    authorId : number
    courseId : number
}

@Table({tableName : "course_authorsheep"})
export class courseAuthorsheepModel extends Model<courseAuthorsheepModel, courseAuthorsheepCreateAttributes>{
    @ApiProperty({example : 1, description : "ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example : "waiting", description : "enum [waiting, accepted, rejected]"})
    @Column({type : DataType.ENUM, values : ['waiting', 'accepted', 'rejected'], defaultValue : authorsheepENUM.waiting})
    status : authorsheepENUM

    @ApiProperty({example : 1, description : "course id"})
    @ForeignKey(() => CoursesModel)
    @Column({type: DataType.INTEGER})
    courseId : number;

    @ApiProperty({example : 1, description : "author id"})
    @ForeignKey(() => AuthorModel)
    @Column({type: DataType.INTEGER})
    authorId : number;
}