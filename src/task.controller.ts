import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskEntity } from './task/task.entity';
import { TaskService } from './task/task.service';

@Controller('tasks')
export class TaskController {

  constructor(private taskService: TaskService) { }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.taskService.findOne(+id);
  }

  @Post()
  addTask(@Body() task: TaskEntity) {
    return this.taskService.creare(task);
  }

  @Patch(':id')
  taskToPatch(@Param('id') id: number, @Body() taskToPatch: TaskEntity) {
    return this.taskService.update(id, taskToPatch);
  };

  @Delete(':id')
  taskDelete(@Param('id') id: number) {
    return this.taskService.delete(+id);
  };

}
