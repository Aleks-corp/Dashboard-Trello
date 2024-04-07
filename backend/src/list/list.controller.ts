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
import { createListDto, updateListDto } from './list.dto';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  getLists(): Promise<List[]> {
    return this.listService.getLists();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() newList: createListDto): Promise<List> {
    return await this.listService.newList(newList);
  }

  @Patch(':id')
  @Bind(Param('id'))
  async patchOne(@Param('id') id: string, @Body() newList: updateListDto) {
    const list = await this.listService.getListById(id);
    if (list) {
      return await this.listService.updateListById(id, newList);
    } else {
      throw new NotFoundException('List not found');
    }
  }

  @Delete(':id')
  @Bind(Param('id'))
  async deleteOne(@Param('id') id: string): Promise<string> {
    const { affected } = await this.listService.deleteListById(id);
    if (affected) {
      return 'List deleted';
    } else {
      throw new NotFoundException('List not found');
    }
  }
}
