import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { AuthorModel } from "src/authors/models/author.model";
import { GroupModel } from "src/groups/models/groups.mode";
import { MessagesModel } from "src/messages/models/messages.model";
import { ModeratorModel } from "src/moderators/moderators.model";
import { Roles } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { Topics } from "src/topics/topic.model";
import { UserTopicModel } from "./user.topics.model";

interface UserCreationAttributes {
    email : string,
    password : string,
    fullName : string
}

@Table({tableName : "users"})
export class UserModel extends Model<UserModel, UserCreationAttributes>{
    @ApiProperty({example : 1, description : "ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : "John Smith", description : "user's full name"})
    @Column({type : DataType.STRING, allowNull : false})
    fullName : string;

    @ApiProperty({example : "user@gmail.com", description : "user's email"})
    @Column({type : DataType.STRING, allowNull : false, unique : true})
    email : string;

    @ApiProperty({example : "false", description : "is user validated his email"})
    @Column({type : DataType.BOOLEAN, allowNull : false, defaultValue : false})
    validated : boolean;

    @ApiProperty({example : "$2a$BPvxDJO3/yo1ffnKAAgSLKaa.jpg", description : "user's avatar"})
    @Column({type : DataType.STRING, allowNull : true, defaultValue : null})
    avatar : string;

    @BelongsToMany(() => Roles, () => UserRoles)
    roles: Roles[];

    @HasOne( ()=> AuthorModel)
    author : AuthorModel

    @HasOne( ()=> ModeratorModel)
    moderator : ModeratorModel

    @HasMany( ()=>GroupModel)
    groups : GroupModel[]

    @HasMany( ()=> MessagesModel)
    messages : MessagesModel[]

    @BelongsToMany(() => Topics, () => UserTopicModel)
    topics: Topics[];
}