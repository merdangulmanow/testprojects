import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { MessagesModel } from "src/messages/models/messages.model";
import { UserModel } from "src/users/modesl/users.model";
import { messageReasonENUM } from "../enum/message.reason.enum"

interface GroupCreateAttributes {
    userId : number
    reason : messageReasonENUM
}

@Table({tableName : "message_groups"})
export class GroupModel extends Model<GroupModel, GroupCreateAttributes>{
    @ApiProperty({example : 1, description : "user ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : messageReasonENUM.technical_support, description : "reaon off chat"})
    @Column({type : DataType.ENUM, values : ['private', 'profile', 'course_activation', 'tech_support'], defaultValue : messageReasonENUM.technical_support})
    reaon : messageReasonENUM

    @ForeignKey( ()=>UserModel)
    @Column({type : DataType.INTEGER})
    userId : number
    @BelongsTo( ()=>UserModel)
    user : UserModel

    
}