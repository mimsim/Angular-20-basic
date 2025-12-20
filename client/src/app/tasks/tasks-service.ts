import { inject, Injectable, signal } from '@angular/core';
import { NewTaskData, Task } from './task.model';
import { filter, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal([
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ]);
  private http = inject(HttpClient);

  users = signal<User[]>([]);

  
  allTasks = this.tasks.asReadonly();
  addTask(taskData: NewTaskData, userId: string) {

  }
  
  saveTasks() { 

  }
  removeTask(id: string) { 
    this.tasks.update((prevTasks) =>
      prevTasks.filter((task)=> task.id != id)
    )
  }
  deleteTask(userId: any, taskId: any) {
    return this.http.delete(
      `https://jsonplaceholder.typicode.com/users/${userId}/tasks/${taskId}`
    );
  }
  getAllTasks() {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/todos').subscribe(users => {
      console.log(users, '+++++++')
      this.users.set(users);
    });
  }
  getTasksByUser(userId: any): Observable<Task[]> {
    console.log('userId', userId)
    return this.http.get<Task[]>(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );
  }
  sendTaskByUser(payload: NewTaskData) {
    return this.http.post<Task[]>(
      `https://jsonplaceholder.typicode.com/todos`, payload
    );
  }
}
