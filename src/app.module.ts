import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User';
import { Permission } from './entity/Permission';
import { AModule } from './a/a.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'ACL',
      password: '123456',
      username: 'root',
      port: 3306,
      host: 'localhost',
      logging: true,
      synchronize: true, // 同步开启, 如果数据库中没有user, 会初始化一个
      connectorPackage: 'mysql2',
      entities: [User, Permission],
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    UserModule,
    AModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
