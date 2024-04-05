import { IsNotEmpty, IsString } from 'class-validator';

export class createBoardDto {
  @IsNotEmpty({ message: 'Please Enter Board Name' })
  @IsString({ message: 'Please Enter Valid Board Name' })
  name: string;
}
