import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'typeormuser',
      password: 'typeormpassword',
      database: 'typeormdatabase',
      entities: [],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}