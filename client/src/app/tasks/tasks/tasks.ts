import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { TasksService } from '../tasks-service';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule,
    ...MATERIAL_IMPORTS,],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks implements OnInit {
  private taskService = inject(TasksService)
  ngOnInit() {
    console.log('app-tasks')
    this.loadTasks();
  }
  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: tasks => {
        console.log('tasks', tasks)
        // this.tasks.set(tasks)
      },
      error: err => console.error(err)
    });
  }
}
