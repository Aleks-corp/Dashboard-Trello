import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async getBoards(): Promise<Board[]> {
    return await this.boardRepository.find({
      relations: ['lists', 'lists.tasks'],
    });
  }

  async newBoard(boardName: string): Promise<Board> {
    return await this.boardRepository.save({ name: boardName });
  }

  async getBoardById(strId: string): Promise<Board> {
    const id = Number(strId);
    return await this.boardRepository.findOne({ where: { id } });
  }

  async updateBoardById(strId: string, newName: string): Promise<Board> {
    const id = Number(strId);
    await this.boardRepository.update(id, { name: newName });
    return await this.boardRepository.findOne({
      where: { id },
      relations: ['lists', 'lists.tasks'],
    });
  }

  async deleteBoardById(id: string) {
    return await this.boardRepository.delete(id);
  }
}
