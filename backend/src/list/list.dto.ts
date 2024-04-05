import { IsNotEmpty, IsString } from 'class-validator';
import { Board } from 'src/board/board.entity';

export class createListDto {
  @IsNotEmpty({ message: 'Please Enter List Name' })
  @IsString({ message: 'Please Enter Valid List Name' })
  name: string;
  @IsNotEmpty({ message: 'Please Enter Board Name' })
  board: Board['name'];
}
