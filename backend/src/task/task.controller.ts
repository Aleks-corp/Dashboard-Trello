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

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

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
    return await this.taskService.newTask(task);
  }

  @Patch(':id')
  @Bind(Param('id'))
  async patchOne(@Param('id') id: string, @Body() newTask: updateTaskDto) {
    const task = await this.taskService.getTaskById(id);
    if (task) {
      return await this.taskService.updateTaskById(id, newTask);
    } else {
      throw new NotFoundException('Task not found');
    }
  }

  @Delete(':id')
  @Bind(Param('id'))
  async deleteOne(@Param('id') id: string): Promise<string> {
    const { affected } = await this.taskService.deleteTaskById(id);
    if (affected) {
      return 'Task deleted';
    } else {
      throw new NotFoundException('Task not found');
    }
  }
}
