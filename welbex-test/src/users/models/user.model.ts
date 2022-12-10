import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { PostModel } from "src/posts/models/posts.model";


interface UserCreateAttributes {
    name : string
    email : string
    password : string
}

@Table({tableName : "users"})
export class UserModel extends Model<UserModel, UserCreateAttributes>{
    @ApiProperty({example : 1, description : "user ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : "John Doe", description : "user's fullname"})
    @Column({type : DataType.STRING, allowNull : false})
    name : string;

    @ApiProperty({example : "user@gmail.com", description : "user's email"})
    @Column({type : DataType.STRING, allowNull : false})
    email : string;

    @ApiProperty({example : "password123", description : "user's password"})
    @Column({type : DataType.STRING, allowNull : false})
    password : string;

    @HasMany(() => PostModel)
    posts: PostModel[];
}