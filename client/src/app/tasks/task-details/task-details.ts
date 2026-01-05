import { Component, inject, input, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { CommonModule, DatePipe } from '@angular/common';
import { Task } from '../task.model';
import { TasksService } from '../tasks-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-details',
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS,
    DatePipe
  ],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails implements OnInit {
  task = input.required<Task>()
  // private tasksService = inject(TasksService)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private taskService = inject(TasksService)
  ngOnInit() {
    console.log('app-task-details')
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
  onComplete() {
    this.taskService.removeTask(this.task().id)
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      onSameUrlNavigation: 'reload',
      queryParamsHandling: 'preserve'
    })
    }

}
