import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, resource, signal } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { User } from '../user.model';
import { UsersService } from '../users-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
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
  currendUserId: any;
  selectedUser = this.usersService.selectedUser;

  userId = toSignal(
    this.route.paramMap.pipe(
      map(params => {
        const id = params.get('id');
        console.log('id', id);
        this.currendUserId = id;
        return id ? Number(id) : undefined;
      })
    )
  );

  user = computed(() => {
    const fromState = this.selectedUser();
    if (fromState) return fromState;

    const id = this.userId();
    if (!id) return undefined;

    return this.usersService.users().find(u => +u.id === this.userId());
  });

  // constructor() {
  //   effect(() => {
  //     const id = this.userId();      
  //     if (!id) {
  //       this.tasks.set([]);
  //       return;
  //     }

  //     this.tasksService.getTasksByUser(id).subscribe(tasksArray => {
  //       this.tasks.set(tasksArray);
  //       // this.currendUserId = id
  //       // console.log('this.currendUserId', this.currendUserId);
  //     });
  //   });

  //   if (this.usersService.users().length === 0) {
  //     this.usersService.loadUsers();
  //   }
  // }
  back() {
    this.usersService.clearSelection(); this.router.navigate(['/']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewTask, {    
      data: {
        userId: this.currendUserId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  deleteTask(taskId: any) {
    this.tasksService.deleteTask(this.currendUserId, taskId).subscribe();
  }
}

