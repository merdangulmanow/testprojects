import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { AuthorModel } from "src/authors/models/author.model";
import { TagsModel } from "src/tags/tags.model";
import { Topics } from "src/topics/topic.model";
import { CreateReviewDTO } from "../dto/create.reviews.dto";
import { courseStatusENUM } from "../enum/course.status.enum";
import { courseStylesENUM } from "../enum/course.styles.enum";
import { CourseChargeableModel } from "./coruse.chargeable.model";
import { courseAuthorsheepModel } from "./course.authorsheep.model";
import { LessonsModel } from "./course.lessons.model";
import { CourseTagsModel } from "./course.tags.model";


interface CourseCreateAttributes {
    name : string,
    style : courseStylesENUM,
    cover : string,
    trailer : string,
    description : string,
    acquisition : string[],
    reviews : CreateReviewDTO[]
    authorId : number
    topicId : number
}

@Table({tableName : "courses"})
export class CoursesModel extends Model<CoursesModel, CourseCreateAttributes> {
    @ApiProperty({example : 1, description : "ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : "course name", description : "course name"})
    @Column({type : DataType.STRING, allowNull : false})
    name : string

    @ApiProperty({example : "free", description : "enum [free, subscription, paid]"})
    @Column({type : DataType.ENUM, values : ['free', 'subscription', 'paid'], defaultValue : courseStylesENUM.free})
    style : courseStylesENUM

    @ApiProperty({example : "draft", description : "enum [free, subscription, paid]"})
    @Column({type : DataType.ENUM, values : ['draft', 'confirmed', 'rejected', 'waiting'], defaultValue : courseStatusENUM.draft})
    status : courseStatusENUM

    @ApiProperty({example : "sdf234-sdfgs-3sdfgs-2fsdfs.jpg", description : "cover file name, uuid, type : image"})
    @Column({type : DataType.STRING, allowNull : false})
    cover : string

    @ApiProperty({example : "2324-sdfsdf-3fds-32fsdf.mp4", description : "trailer file name, uuid, type : video"})
    @Column({type : DataType.STRING, allowNull : false})
    trailer : string

    @ApiProperty({example : "this is the best course", description : "description of course"})
    @Column({type : DataType.TEXT, allowNull : false})
    description : string

    @ApiProperty({example : " [sdf234-sdfgs-3sdfgs-2fsdfs.jpg, sdf234-sdfgs-3sdfgs-2fsdfs.jpg, sdf234-sdfgs-3sdfgs-2fsdfs.jpg] ", description : "вы приобретете"})
    @Column({type : DataType.ARRAY(DataType.STRING), allowNull : false})
    acquisition : string[]

    @Column({type : DataType.JSONB, allowNull : false})
    reviews : CreateReviewDTO[]

    @ForeignKey( ()=>Topics)
    @Column({type : DataType.INTEGER})
    topicId : number
    @BelongsTo( ()=>Topics)
    topic : Topics

    @ForeignKey( ()=> AuthorModel)
    @Column({type : DataType.INTEGER})
    authorId : number
    @BelongsTo( ()=> AuthorModel)
    author : AuthorModel

    @BelongsToMany(()=>TagsModel, ()=>CourseTagsModel)
    tags : TagsModel[]

    @BelongsToMany( ()=> AuthorModel, ()=>courseAuthorsheepModel)
    co_author : AuthorModel[]

    @HasMany( ()=> LessonsModel)
    lessons : LessonsModel[]

    @HasOne( ()=> CourseChargeableModel)
    course_chargeable : CourseChargeableModel;
}



// get courses by user selected topic IDs


// vidy kursov :
// a) free
// b) subscription
// c) paid

// tags of selected topic
// sfera (only one topic ID)

// oblozhka (image) cover
// treyler (video)  trailer
// course name (string)

// description
// "vy priobretyote" string[]  acquisition
// "vy uznayete" string[] (images)  will learn

// "chto govoryat o kurse"    reviews
// array[]
// imya : string
// status : string
// kommentariy : string
// image : string (image file)