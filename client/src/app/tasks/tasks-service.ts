import { inject, Injectable, signal } from '@angular/core';
import { NewTaskData, Task } from './task.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  url = 'http://localhost:3000/api/'

  // private tasks = signal([])
  users = signal<User[]>([]);

  tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();
  addTask(taskData: NewTaskData, userId: string) {
    return this.http.post<User>(`${this.url}task`, taskData);
  }
  
  saveTasks() { 

  }
  removeTask(id: string) { 
    // this.tasks.update((prevTasks) =>
    //   prevTasks.filter((task)=> task != id)
    // )
  }
  deleteTask(userId: any, taskId: any) {
    return this.http.delete(`${this.url}task/${taskId}`);
  }
  getAllTasks() {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Task[]>(`${this.url}tasks`, { headers });
  }

  sendTaskByUser(payload: NewTaskData) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.url}task`, payload, { headers });
  }


}
