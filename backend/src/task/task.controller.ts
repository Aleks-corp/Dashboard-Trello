import {
  Bind,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { createTaskDto, updateTaskDto } from './task.dto';
import { Task } from './task.entity';
import { ActionLogService } from 'src/action-log/action-log.service';
import { ENTITY_TYPE } from 'src/constant/entity-type.constant';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly logService: ActionLogService,
  ) {}

  @Get()
  getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Get(':id')
  @Bind(Param('id'))
  async findOne(@Param('id') id: string): Promise<Task> {
    const task = await this.taskService.getTaskById(id);
    if (task) {
      return task;
    } else {
      throw new NotFoundException('Task not found');
    }
  }

  @Post()
  @HttpCode(201)
  async create(@Body() task: createTaskDto): Promise<Task> {
    const newTask = await this.taskService.newTask(task);
    if (newTask) {
      await this.logService.logAction(
        `'${newTask.name}' task created`,
        ENTITY_TYPE.task,
        newTask.id,
      );
    }
    return newTask;
  }

  @Patch(':id')
  @Bind(Param('id'))
  async patchOne(@Param('id') id: string, @Body() newTask: updateTaskDto) {
    const oldTask = await this.taskService.getTaskById(id);
    if (oldTask) {
      const updatedTask = await this.taskService.updateTaskById(id, newTask);
      await this.logService.logTaskUpdate(updatedTask, oldTask);
      return updatedTask;
    } else {
      throw new NotFoundException('Task not found');
    }
  }

  @Delete(':id')
  @Bind(Param('id'))
  async deleteOne(@Param('id') id: string): Promise<string> {
    const task = await this.taskService.getTaskById(id);
    if (task) {
      await this.taskService.deleteTaskById(id);
      await this.logService.logAction(
        `'${task.name}' task deleted`,
        ENTITY_TYPE.task,
        task.id,
      );
      return 'Task deleted';
    } else {
      throw new NotFoundException('Task not found');
    }
  }
}
