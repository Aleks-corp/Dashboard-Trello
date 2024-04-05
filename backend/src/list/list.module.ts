import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { List } from './list.entity';
import { BoardModule } from '../board/board.module';

@Module({
  imports: [TypeOrmModule.forFeature([List]), BoardModule],
  providers: [ListService],
  controllers: [ListController],
  exports: [TypeOrmModule.forFeature([List])],
})
export class ListModule {}
