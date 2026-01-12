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
  
  deleteTask(taskId: any) {
    return this.http.delete(`${this.url}task/${taskId}`);
  }
  getAllTasks(userId: any) {  
    return this.http.get<Task[]>(`${this.url}tasks?userId=${userId}`);
  }

  sendTaskByUser(payload: NewTaskData) {
       return this.http.post(`${this.url}task`, payload);
  }

  getTaskById(id: string) {
    return this.http.get(`${this.url}task/${id}`);
  }

  updateTask(id: string, data: any) {
    return this.http.put(`${this.url}task/${id}`, data);
  }
}
