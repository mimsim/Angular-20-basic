import { Component, effect, inject, input } from '@angular/core';
import { TasksService } from '../../tasks/tasks-service';

@Component({
  selector: 'app-user-tasks',
  imports: [],
  templateUrl: './user-tasks.html',
  styleUrl: './user-tasks.scss',
})
export class UserTasks {
  userName = input.required<string>();
  message = input.required<string>();

  private tasksService = inject(TasksService);

  loadUsersEffect = effect(() => {
    this.tasksService.getAllTasks()
  });
}
