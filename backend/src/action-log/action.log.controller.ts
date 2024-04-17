import {
  Bind,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ActionLogService } from '../action-log/action-log.service';
import { ActionLog } from './action-log.entity';

@Controller('logs')
export class LogController {
  constructor(private readonly logService: ActionLogService) {}

  @Get()
  getLogs(): Promise<ActionLog[]> {
    return this.logService.getLogs();
  }

  @Get(':id')
  @Bind(Param('id'))
  async getLogsByTaskId(@Param('id') id: string): Promise<ActionLog[]> {
    const taskLogs = await this.logService.getLogsByTaskId(id);
    if (taskLogs) {
      return taskLogs;
    } else {
      throw new NotFoundException('Desk not found');
    }
  }
}
