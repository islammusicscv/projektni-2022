import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
      UserModule,
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'projektni',
        entities: [],
        autoLoadEntities: true,
        synchronize: true,
      }),
      AuthModule,
      CommonModule,
      PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
