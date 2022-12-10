import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { HelperModule } from 'src/helper/helper.module';
import { PostModel } from './models/posts.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports : [
    SequelizeModule.forFeature([
      PostModel
    ]),
    HelperModule,
    forwardRef(() => AuthModule),
  ]
})
export class PostsModule {}