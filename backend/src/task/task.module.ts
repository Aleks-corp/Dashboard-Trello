import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { ListModule } from '../list/list.module';
import { BoardModule } from 'src/board/board.module';
import { LogModule } from 'src/action-log/action-log.module';
import { ActionLog } from 'src/action-log/action-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, ActionLog]),
    ListModule,
    BoardModule,
    LogModule,
  ],

  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
