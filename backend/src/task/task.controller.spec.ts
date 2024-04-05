import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskPriority } from './task.entity';

describe('TaskController', () => {
  let controller: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const tasks = [
        {
          id: 1,
          name: 'Task 1',
          description: 'Description 1',
          list: 'List 1',
          priority: TaskPriority.LOW,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Task 2',
          description: 'Description 2',
          list: 'List 2',
          priority: TaskPriority.HIGH,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      jest.spyOn(taskService, 'getTasks').mockResolvedValue(tasks);

      expect(await controller.getTasks()).toBe(tasks);
    });
  });
});
