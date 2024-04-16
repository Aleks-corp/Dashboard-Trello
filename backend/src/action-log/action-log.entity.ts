import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Task } from '../task/task.entity';

@Entity()
export class ActionLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  actionType: string;

  @ManyToOne(() => Task, (task) => task.actionLogs, { onDelete: 'CASCADE' })
  task: Task;

  @CreateDateColumn()
  createdAt: Date;
}
