import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  addTask = new FormGroup({

  })
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  submitTask() {
    console.log(this.addTask.value)
  }
}
