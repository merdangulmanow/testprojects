import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Topics } from "src/topics/topic.model";
import { UserModel } from "./users.model";

interface UserTopicCreateAttributes {
    userId : number
    topicId : number
}

@Table({tableName : "user_topics", createdAt : false})
export class UserTopicModel extends Model<UserTopicModel, UserTopicCreateAttributes>{
    @ApiProperty({example : 1, description : "ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : 1, description : "user id"})
    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ApiProperty({example : 1, description : "topic id"})
    @ForeignKey(() => Topics)
    @Column({type: DataType.INTEGER})
    topicId: number;
}