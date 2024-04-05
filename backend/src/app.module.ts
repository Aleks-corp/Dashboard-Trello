import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import 'dotenv/config';
import { ListModule } from './list/list.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TaskModule,
    ListModule,
    BoardModule,
  ],
})
export class AppModule {}
