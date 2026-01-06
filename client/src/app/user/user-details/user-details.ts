import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { UsersService } from '../users-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
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

  tasks = signal<Task[]>([]);
  selectedUser = this.usersService.selectedUser;

  userId = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id') ?? undefined)
    )
  );

  user = computed(() => {
    const fromState = this.selectedUser();
    if (fromState) return fromState;

    const id = this.userId();
    if (!id) return undefined;
    return this.usersService.users().find(u => u.id === id);
  });

  constructor() {
    effect(() => {
      const id = this.userId();
      if (id) this.loadTasks(id);
    });
  }

  back() {
    this.usersService.clearSelection();
    this.router.navigate(['/']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewTask, {
      data: { userId: this.userId() }
    });

    dialogRef.afterClosed().subscribe(() => {
      const id = this.userId();
      if (id) this.loadTasks(id);
    });
  }

  deleteTask(taskId: any) {
    const id = this.userId();
    if (!id) return;

    this.tasksService.deleteTask(id, taskId).subscribe(() => {
      this.loadTasks(id);
    });
  }

  loadTasks(userId: string) {
    this.tasksService.getAllTasks().subscribe({
      next: tasks => {
        const userTasks = tasks.filter(t => t.userId === userId);
        this.tasks.set(userTasks);
      },
      error: err => console.error(err)
    });
  }
}


