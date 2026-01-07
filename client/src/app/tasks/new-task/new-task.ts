import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTask {
  private formBuilder = inject(FormBuilder);
  private taskService = inject(TasksService)
  data = inject<NewTask>(MAT_DIALOG_DATA);

  userId: any;
  addTask = this.formBuilder.group({
    title: ['', { validators: Validators.required }],
    description: ['', { validators: Validators.required }],
    picker: ['', { validators: Validators.required }],   // ← добави го
    completed: [false, { validators: Validators.required }],
  })
  decodedUser: any;

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodedUser = token;      
    }
}

  submitTask() {
    const payload = {
      ...this.addTask.getRawValue(),
      completed: !!this.addTask.value.completed,
      userId: this.data.userId
    };

    console.log('Payload for backend:', payload);

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
