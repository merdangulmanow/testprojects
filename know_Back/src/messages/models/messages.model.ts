import { ApiProperty } from "@nestjs/swagger/dist";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { GroupModel } from "src/groups/models/groups.mode";
import { UserModel } from "src/users/modesl/users.model";

interface MessageModelCreateAttributes {
    message : string
    userId : number
    groupId : number
}

@Table({tableName : "messages"})
export class MessagesModel extends Model<MessagesModel, MessageModelCreateAttributes>{
    @ApiProperty({example : 1, description : "user ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : "hello world", description : "text of message"})
    @Column({type : DataType.TEXT, allowNull : false})
    message : string

    @ForeignKey( ()=>UserModel)
    @Column({type : DataType.INTEGER})
    userId : number
    @BelongsTo( ()=>UserModel)
    user : UserModel

    @ForeignKey( ()=>GroupModel)
    @Column({type : DataType.INTEGER})
    groupdId : number
    @BelongsTo( ()=>GroupModel)
    group : GroupModel
}