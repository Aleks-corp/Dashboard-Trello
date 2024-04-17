import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { LogModule } from 'src/action-log/action-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), LogModule],
  providers: [BoardService],
  controllers: [BoardController],
  exports: [TypeOrmModule.forFeature([Board])],
})
export class BoardModule {}
