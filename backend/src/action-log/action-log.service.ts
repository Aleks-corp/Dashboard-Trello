import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionLog } from './action-log.entity';
import { Task } from '../task/task.entity';
import { ENTITY_TYPE } from '../constant/entity-type.constant';

@Injectable()
export class ActionLogService {
  constructor(
    @InjectRepository(ActionLog)
    private actionLogRepository: Repository<ActionLog>,
  ) {}

  async logAction(actionType: string, entityType: string, entityId: number) {
    await this.actionLogRepository.save({ actionType, entityType, entityId });
  }

  async logTaskUpdate(newTask: Task, oldTask: Task) {
    if (oldTask.name !== newTask.name) {
      await this.actionLogRepository.save({
        actionType: `'${oldTask.name}' task name changed to '${newTask.name}'`,
        entityType: ENTITY_TYPE.task,
        entityId: newTask.id,
      });
    }
    if (oldTask.description !== newTask.description) {
      await this.actionLogRepository.save({
        actionType: `Task '${newTask.name}' description updated`,
        entityType: ENTITY_TYPE.task,
        entityId: newTask.id,
      });
    }
    if (oldTask.priority !== newTask.priority) {
      await this.actionLogRepository.save({
        actionType: `Task '${newTask.name}' priority change from '${oldTask.priority}' to '${newTask.priority}'`,
        entityType: ENTITY_TYPE.task,
        entityId: newTask.id,
      });
    }
    if (oldTask.list.name !== newTask.list.name) {
      await this.actionLogRepository.save({
        actionType: `Task '${newTask.name}' moved from '${oldTask.list.name}' to '${newTask.list.name}' list`,
        entityType: ENTITY_TYPE.task,
        entityId: newTask.id,
      });
    }
  }

  async getLogs(): Promise<ActionLog[]> {
    return await this.actionLogRepository.find();
  }

  async getLogsByTaskId(id: string): Promise<ActionLog[]> {
    return await this.actionLogRepository.find({
      where: { entityId: parseInt(id), entityType: ENTITY_TYPE.task },
    });
  }
}
