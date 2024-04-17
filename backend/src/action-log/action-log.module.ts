import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionLog } from './action-log.entity';
import { ActionLogService } from './action-log.service';
import { LogController } from './action.log.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActionLog])],
  providers: [ActionLogService],
  controllers: [LogController],
  exports: [ActionLogService],
})
export class LogModule {}
