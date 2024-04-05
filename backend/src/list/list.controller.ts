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
import { ListService } from './list.service';
import { List } from './list.entity';
import { createListDto } from './list.dto';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  getBoards(): Promise<List[]> {
    return this.listService.getLists();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() newList: createListDto): Promise<List> {
    return await this.listService.newList(newList);
  }

  @Patch(':id')
  @Bind(Param('id'))
  async patchOne(@Param('id') id: string, @Body() newName: createListDto) {
    const task = await this.listService.getListById(id);
    if (task) {
      return await this.listService.updateListById(id, newName.name);
    } else {
      throw new NotFoundException('Task not found');
    }
  }

  @Delete(':id')
  @Bind(Param('id'))
  async deleteOne(@Param('id') id: string): Promise<string> {
    const { affected } = await this.listService.deleteListById(id);
    if (affected) {
      return 'Task deleted';
    } else {
      throw new NotFoundException('Task not found');
    }
  }
}
