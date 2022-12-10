import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "src/users/models/user.model";


interface PostCreateAttributes {
    title : string
    content: string | null
    filename : string | null
    userId : number
}

@Table({tableName : "posts"})
export class PostModel extends Model<PostModel, PostCreateAttributes>{
    @ApiProperty({example : 1, description : "user ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : 'first post', description : "title of post"})
    @Column({type : DataType.STRING, allowNull : false})
    title : string

    @ApiProperty({example : 'hello world', description : "content of post"})
    @Column({type: DataType.STRING, allowNull: true})
    content: string;

    @ApiProperty({example : "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", description : "uuidv4"})
    @Column({type : DataType.STRING, allowNull : true})
    filename : string

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER})
    userId: number;
    @BelongsTo(() => UserModel)
    author : UserModel
}