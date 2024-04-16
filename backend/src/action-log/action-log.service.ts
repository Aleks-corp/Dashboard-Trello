import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionLog } from './action-log.entity';
import { Task } from 'src/task/task.entity';

@Injectable()
export class ActionLogService {
  constructor(
    @InjectRepository(ActionLog)
    private actionLogRepository: Repository<ActionLog>,
  ) {}

  async logAction(actionType: string, task: Task) {
    const newLog = this.actionLogRepository.create({ actionType, task });
    await this.actionLogRepository.save(newLog);
  }

  async deleteLogsByTaskId(task: Task) {
    await this.actionLogRepository.delete({ task });
  }
}
