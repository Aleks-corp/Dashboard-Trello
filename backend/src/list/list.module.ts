import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { List } from './list.entity';
import { BoardModule } from '../board/board.module';
import { LogModule } from 'src/action-log/action-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([List]), BoardModule, LogModule],
  providers: [ListService],
  controllers: [ListController],
  exports: [TypeOrmModule.forFeature([List])],
})
export class ListModule {}
