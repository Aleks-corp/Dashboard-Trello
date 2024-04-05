import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { List } from 'src/list/list.entity';

enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class createTaskDto {
  @IsNotEmpty({ message: 'Please Enter Task Name' })
  @IsString({ message: 'Please Enter Valid Task Name' })
  name: string;

  @IsNotEmpty({ message: 'Please Enter Task Description' })
  @IsString({ message: 'Please Enter Valid Task Description' })
  description: string;

  @IsNotEmpty({ message: 'Please Enter Task Priority' })
  @IsString({ message: 'Please Enter Valid Task Priority (low, medium, high)' })
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsNotEmpty({ message: 'Please Enter Task List' })
  @IsString({ message: 'Please Enter Valid Task List' })
  list: List['name'];
}

export class updateTaskDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Please Enter Task Name' })
  @IsString({ message: 'Please Enter Valid Task Name' })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Please Enter Task Description' })
  @IsString({ message: 'Please Enter Valid Task Description' })
  description?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Please Enter Task Priority' })
  @IsString({ message: 'Please Enter Valid Task Priority (low, medium, high)' })
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsNotEmpty({ message: 'Please Enter Task List' })
  @IsString({ message: 'Please Enter Valid Task List' })
  list?: List['name'];
}
