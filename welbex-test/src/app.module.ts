import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HelperModule } from './helper/helper.module';
import { UserModel } from './users/models/user.model';
import { PostsModule } from './posts/posts.module';
import { PostModel } from './posts/models/posts.model';


@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath : join(__dirname, 'static'),
      serveRoot : "/api"
    }),
    ConfigModule.forRoot({
      envFilePath : '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        UserModel, PostModel
      ],
      autoLoadModels : true,
      synchronize : true, 
      // logging : false
    }),
    UsersModule,
    AuthModule,
    HelperModule,
    PostsModule,
  ],
})
export class AppModule {}
