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
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { createBoardDto } from './board.dto';
import { ActionLogService } from '../action-log/action-log.service';
import { ENTITY_TYPE } from '../constant/entity-type.constant';

@Controller('boards')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly logService: ActionLogService,
  ) {}

  @Get()
  getBoards(): Promise<Board[]> {
    return this.boardService.getBoards();
  }

  @Get(':id')
  @Bind(Param('id'))
  async getBoardById(@Param('id') id: string): Promise<Board> {
    const board = await this.boardService.getBoardById(id);
    if (board) {
      return board;
    } else {
      throw new NotFoundException('Desk not found');
    }
  }

  @Post()
  @HttpCode(201)
  async create(@Body() board: createBoardDto): Promise<createBoardDto> {
    const newBoard = await this.boardService.newBoard(board.name);
    if (newBoard) {
      await this.logService.logAction(
        `'${newBoard.name}' desk created`,
        ENTITY_TYPE.board,
        newBoard.id,
      );
    }
    return newBoard;
  }

  @Patch(':id')
  @Bind(Param('id'))
  async patchOne(@Param('id') id: string, @Body() newBoard: createBoardDto) {
    const board = await this.boardService.getBoardById(id);
    if (board && board.name !== newBoard.name) {
      const updatedBoard = await this.boardService.updateBoardById(
        id,
        newBoard.name,
      );
      await this.logService.logAction(
        `'${board.name}' desk name changed to '${newBoard.name}'`,
        ENTITY_TYPE.board,
        updatedBoard.id,
      );
      return updatedBoard;
    } else {
      throw new NotFoundException('Desk not found');
    }
  }

  @Delete(':id')
  @Bind(Param('id'))
  async deleteOne(@Param('id') id: string): Promise<string> {
    const board = await this.boardService.getBoardById(id);
    if (board) {
      await this.boardService.deleteBoardById(id);
      await this.logService.logAction(
        `'${board.name}' desk deleted`,
        ENTITY_TYPE.board,
        board.id,
      );
      return 'Desk deleted';
    } else {
      throw new NotFoundException('Desk not found');
    }
  }
}
