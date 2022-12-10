import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Topics } from "src/topics/topic.model";
import { AuthorModel } from "./author.model";


interface authorTopicCreateAttributes {
    authorId : number,
    topicId : number
}

@Table({tableName : 'author_topic', updatedAt : false})
export class AuhtorTopicsModel extends Model<AuhtorTopicsModel, authorTopicCreateAttributes> {
    @ApiProperty({example : 1, description : "ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example : 1, description : "author id"})
    @ForeignKey(() => AuthorModel)
    @Column({type: DataType.INTEGER})
    authorId: number;

    @ApiProperty({example : 1, description : "topic id"})
    @ForeignKey(() => Topics)
    @Column({type: DataType.INTEGER})
    topicId : number;
}