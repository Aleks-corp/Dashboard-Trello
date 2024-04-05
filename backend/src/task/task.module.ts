import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { ListModule } from '../list/list.module';
import { BoardModule } from 'src/board/board.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ListModule, BoardModule],

  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
