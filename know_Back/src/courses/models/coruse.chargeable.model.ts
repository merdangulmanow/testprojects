import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { CoursesModel } from "./courses.model";


interface CourseChargeableCreateAttibutes {
    courseId : number
    price : number
    vip : number
}

@Table({tableName : 'course_chargeable'})
export class CourseChargeableModel extends Model<CourseChargeableModel, CourseChargeableCreateAttibutes>{
    @ApiProperty({example : 1, description : "ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : "100", description : "price of course"})
    @Column({type : DataType.INTEGER, allowNull : false})
    price : number

    @ApiProperty({example : "140", description : "price of vip"})
    @Column({type : DataType.INTEGER, allowNull : false})
    vip : number

    @ForeignKey( ()=> CoursesModel)
    @Column({type : DataType.INTEGER})
    courseId : number
    @BelongsTo( ()=> CoursesModel)
    course : CoursesModel
}