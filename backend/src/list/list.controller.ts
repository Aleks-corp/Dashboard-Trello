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
import { ActionLogService } from 'src/action-log/action-log.service';
import { ENTITY_TYPE } from 'src/constant/entity-type.constant';

@Controller('lists')
export class ListController {
  constructor(
    private readonly listService: ListService,
    private readonly logService: ActionLogService,
  ) {}

  @Get()
  getLists(): Promise<List[]> {
    return this.listService.getLists();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() list: createListDto): Promise<List> {
    const newList = await this.listService.newList(list);
    if (newList) {
      await this.logService.logAction(
        `'${newList.name}' list created`,
        ENTITY_TYPE.list,
        newList.id,
      );
    }
    return newList;
  }

  @Patch(':id')
  @Bind(Param('id'))
  async patchOne(@Param('id') id: string, @Body() newList: updateListDto) {
    const list = await this.listService.getListById(id);
    if (list && list.name !== newList.name) {
      const updatedList = await this.listService.updateListById(id, newList);
      await this.logService.logAction(
        `'${list.name}' list name changed to '${newList.name}'`,
        ENTITY_TYPE.list,
        updatedList.id,
      );
      return updatedList;
    } else {
      throw new NotFoundException('List not found');
    }
  }

  @Delete(':id')
  @Bind(Param('id'))
  async deleteOne(@Param('id') id: string): Promise<string> {
    const list = await this.listService.getListById(id);
    if (list) {
      await this.listService.deleteListById(id);
      await this.logService.logAction(
        `'${list.name}' list deleted`,
        ENTITY_TYPE.list,
        list.id,
      );
      return 'List deleted';
    } else {
      throw new NotFoundException('List not found');
    }
  }
}
