import { Injectable, NotFoundException } from '@nestjs/common';
import { createTaskDto, updateTaskDto } from './task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { List } from 'src/list/list.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: ['list', 'actionLogs'],
    });
  }

  async newTask(taskData: createTaskDto): Promise<Task> {
    const { list, name, description, priority } = taskData;
    const foundList = await this.listRepository.findOne({
      where: { name: list },
    });

    if (!foundList) {
      throw new Error('List not found');
    }

    const newTask = new Task();
    newTask.name = name;
    newTask.description = description;
    newTask.priority = priority;
    newTask.list = foundList;

    const task = await this.taskRepository.save(newTask);
    return task;
  }

  async getTaskById(strId: string): Promise<Task> {
    const id = Number(strId);
    return await this.taskRepository.findOne({
      where: { id },
      relations: ['list', 'actionLogs'],
    });
  }

  async updateTaskById(strId: string, newTask: updateTaskDto): Promise<Task> {
    const id = Number(strId);
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['list', 'actionLogs'],
    });
    if (newTask.list) {
      const list = await this.listRepository.findOne({
        where: { name: newTask.list },
      });
      if (!list) {
        throw new NotFoundException('List not found');
      }
      task.list = list;
    }
    newTask.name && (task.name = newTask.name);
    newTask.description && (task.description = newTask.description);
    newTask.priority && (task.priority = newTask.priority);

    const updatedTask = await this.taskRepository.save(task);

    return updatedTask;
  }

  async deleteTaskById(strId: string) {
    const id = Number(strId);
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    const { affected } = await this.taskRepository.delete(id);
    if (affected) {
      return task;
    } else {
      throw new NotFoundException('Task not found');
    }
  }
}
