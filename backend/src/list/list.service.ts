import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './list.entity';
import { createListDto } from './list.dto';
import { Board } from 'src/board/board.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async getLists(): Promise<List[]> {
    return await this.listRepository.find({ relations: ['board', 'tasks'] });
  }

  async newList(ListData: createListDto): Promise<List> {
    const { board, name } = ListData;

    const foundBoard = await this.boardRepository.findOne({
      where: { name: board },
    });

    if (!foundBoard) {
      throw new Error('Board not found');
    }

    const newList = new List();
    newList.name = name;
    newList.board = foundBoard;

    return await this.listRepository.save(newList);
  }

  async getListById(strId: string): Promise<List> {
    const id = Number(strId);
    return await this.listRepository.findOne({ where: { id } });
  }

  async updateListById(strId: string, newName: string): Promise<List> {
    const id = Number(strId);
    await this.listRepository.update(id, { name: newName });
    return await this.listRepository.findOne({ where: { id } });
  }

  async deleteListById(id: string) {
    return await this.listRepository.delete(id);
  }
}
