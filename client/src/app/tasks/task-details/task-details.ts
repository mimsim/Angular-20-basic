import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { CommonModule, DatePipe } from '@angular/common';
import { Task } from '../task.model';
import { TasksService } from '../tasks-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../user/users-service';

@Component({
  selector: 'app-task-details',
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS,
  ],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails {

  private route = inject(ActivatedRoute);
  private taskService = inject(TasksService);
  private usersService = inject(UsersService);
  private router = inject(Router);
  // signal за task данните
  task = signal<any>(null);
  id: any;
  constructor() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.taskService.getTaskById(this.id).subscribe(data => {
        this.task.set(data);
      });
    }
  }
  back() {
    // this.usersService.clearSelection();
    // this.router.navigate(['/users/' + this.id]);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/users/' + this.id]);
    });
  }
}
