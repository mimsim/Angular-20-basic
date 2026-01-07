import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { UsersService } from '../users-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TasksService } from '../../tasks/tasks-service';
import { Task } from '../../tasks/task.model';
import { MatDialog } from '@angular/material/dialog';
import { NewTask } from '../../tasks/new-task/new-task';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS,
    RouterModule ],
    templateUrl: './user-details.html',
    styleUrl: './user-details.scss',
  })
export class UserDetails {
  private usersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tasksService = inject(TasksService);
  readonly dialog = inject(MatDialog);

  selectedUser = this.usersService.selectedUser;

  // Сигнал за userId
  userId = signal<string | undefined>(this.route.snapshot.paramMap.get('id') ?? undefined);

  // Сигнал с всички задачи
  allTasks = signal<Task[]>([]);

  // Computed tasks за текущия user
  tasks = computed(() => {
    const id = this.userId();
    if (!id) return [];
    return this.allTasks().filter(t => t.userId?.toString() === id.toString());
  });

  // Computed user
  user = computed(() => {
    const id = this.userId();
    if (!id) return undefined;

    const fromState = this.selectedUser();
    if (fromState?.id === id) return fromState;

    return this.usersService.users().find(u => u.id === id);
  });

  constructor() {
    this.route.paramMap.subscribe(params => {
      this.userId.set(params.get('id') ?? undefined);
    });

    effect(() => {
      const id = this.userId();
      if (id) this.loadTasks();
    });
  }

  back() {
    this.usersService.clearSelection();
    this.router.navigate(['/']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewTask, {
      width: '500px',
      data: { userId: this.userId() }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(taskId: any) {
     this.tasksService.deleteTask(taskId).subscribe(() => {  
      this.loadTasks();
    });
  }

  loadTasks() {
    const id = this.userId();
    if (!id) return;

    this.tasksService.getAllTasks(id).subscribe({
      next: tasks => {
        this.allTasks.set(tasks); 
      },
      error: err => console.error(err)
    });
  }
  trackByTaskId(index: number, task: Task) {
    return task.id;
  }
}