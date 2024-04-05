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

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  getBoards(): Promise<Board[]> {
    return this.boardService.getBoards();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() board: createBoardDto): Promise<createBoardDto> {
    return await this.boardService.newBoard(board.name);
  }

  @Patch(':id')
  @Bind(Param('id'))
  async patchOne(@Param('id') id: string, @Body() newName: createBoardDto) {
    const task = await this.boardService.getBoardById(id);
    if (task) {
      return await this.boardService.updateBoardById(id, newName.name);
    } else {
      throw new NotFoundException('Task not found');
    }
  }

  @Delete(':id')
  @Bind(Param('id'))
  async deleteOne(@Param('id') id: string): Promise<string> {
    const { affected } = await this.boardService.deleteBoardById(id);
    if (affected) {
      return 'Task deleted';
    } else {
      throw new NotFoundException('Task not found');
    }
  }
}
