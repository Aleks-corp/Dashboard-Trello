import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { ListModule } from '../list/list.module';
import { LogModule } from 'src/action-log/action-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), LogModule, ListModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
