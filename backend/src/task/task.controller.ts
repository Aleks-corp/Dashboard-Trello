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

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly actionLogService: ActionLogService,
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
    await this.actionLogService.logAction('Task Created', newTask);
    return await this.taskService.getTaskById(newTask.id.toString());
  }

  @Patch(':id')
  @Bind(Param('id'))
  async patchOne(@Param('id') id: string, @Body() newTask: updateTaskDto) {
    const task = await this.taskService.getTaskById(id);
    if (task) {
      if (task.name !== newTask.name) {
        await this.actionLogService.logAction('Updated task name', task);
      }
      if (task.description !== newTask.description) {
        await this.actionLogService.logAction('Updated task description', task);
      }
      if (task.priority !== newTask.priority) {
        await this.actionLogService.logAction('Updated task priority', task);
      }
      if (task.list.name !== newTask.list) {
        await this.actionLogService.logAction(
          `Moved to ${newTask.list} list`,
          task,
        );
      }
      const updatedTask = await this.taskService.updateTaskById(id, newTask);
      return updatedTask;
    } else {
      throw new NotFoundException('Task not found');
    }
  }

  @Delete(':id')
  @Bind(Param('id'))
  async deleteOne(@Param('id') id: string): Promise<string> {
    const task = await this.taskService.deleteTaskById(id);
    if (task) {
      await this.actionLogService.deleteLogsByTaskId(task);
      return 'Task deleted';
    } else {
      throw new NotFoundException('Task not found');
    }
  }
}
