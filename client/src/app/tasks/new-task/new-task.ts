import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../tasks-service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task',
  imports: [CommonModule,
    ...MATERIAL_IMPORTS,
    ReactiveFormsModule,],
  providers: [provideNativeDateAdapter()],
  templateUrl: './new-task.html',
  styleUrl: './new-task.scss',
})
export class NewTask {
  private formBuilder = inject(FormBuilder);
  private taskService = inject(TasksService)
  data = inject<NewTask>(MAT_DIALOG_DATA);

  userId: any;
  addTask = this.formBuilder.group({
    title: new FormControl(''),
    body: new FormControl('')
  })
  decodedUser: any;

  constructor() {
    console.log(this.data)
    const token = localStorage.getItem('token');
    if (token) {
      this.decodedUser = token;      
    }
}

  submitTask() {
    const payload = {
      ...this.addTask.getRawValue(),
      userId: this.data.userId
    };

    console.log('Payload for backend:', payload);  // виж какво се логва

    this.taskService.sendTaskByUser(payload).subscribe({
      next: (res) => {
        console.log('Task successfully created', res);
        this.addTask.reset();
      },
      error: (err) => {
        console.error('Error creating task', err);
      }
    });
  }


}
