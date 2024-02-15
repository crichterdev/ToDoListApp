// edit-task-modal.component.ts
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService } from '../todo.service';
import { Task } from 'src/app/core/models/Task';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.css'],
})
export class EditTaskModalComponent {
  task: Task;
  editForm!: FormGroup;
  @ViewChild('taskTitleInput') taskTitleInput!: NgModel;

  constructor(
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    private todoService: TodoService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {
    this.buildForm();
    this.task = { ...data.task };
  }

  buildForm(): void {
    this.editForm = this.fb.group({
      taskTitle: [
        '',
        {
          validators: [Validators.required, Validators.minLength(4)],
          updateOn: 'change',
        },
      ],
    });
  }

  onSubmit(): void {
    if (this.taskTitleInput.value && this.taskTitleInput.valid)
    {
      this.todoService.updateTask(this.task).subscribe(
        (updatedTask) => {
          console.log('Tarea actualizada:', updatedTask);
          this.dialogRef.close(updatedTask);
        },
        (error) => {
          console.error('Error al actualizar la tarea:', error);
        }
      );

    }

  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
