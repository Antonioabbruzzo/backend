import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { log } from 'console';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  count: number = 0;

  constructor(@InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>) { }
  async creare(task: TaskEntity) {
    task.id = this.count++;
    await this.taskRepository.save(task);
  }

  async findAll() {
    const tasks: TaskEntity[] = await this.taskRepository.find();
    if (tasks.length == 0) {
      throw new HttpException({}, HttpStatus.NO_CONTENT);
    }
    return tasks;
  }

  async findOne(idTask: number) {
    const task: TaskEntity = await this.taskRepository.findOne({
      where: {
        id: idTask
      }
    });
    if (!task) {
      throw new HttpException({}, HttpStatus.NOT_FOUND);
    }
  }

  async update(idTask: number, taskToUpdate: TaskEntity) {
    await this.findOne(idTask);
    await this.taskRepository.update({
      id: idTask
    },
      taskToUpdate,
    );
    return this.findOne(idTask);
  }

  async delete(idTask: number) {
    await this.findOne(idTask);
    return this.taskRepository.delete({ id: idTask });
  }

}
