import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoService } from '../todo.service';
import { Task } from 'src/app/core/models/Task';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskModalComponent implements AfterViewInit {
  addForm!: FormGroup;
  @ViewChild('cancelButton') cancelButton: any;

  constructor(
    public dialogRef: MatDialogRef<AddTaskModalComponent>,
    private todoService: TodoService,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.addForm = this.fb.group({
      taskTitle: ['', { validators: [Validators.required, Validators.minLength(4)], updateOn: 'change' }],
    });
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      const task: Task = {
        id: 0,
        title: this.addForm.value.taskTitle,
        isDone: false
      };

      this.todoService.createTask(task).subscribe({
        next: (createdTask) => {
          this.dialogRef.close(createdTask);
        },
        error: (error) => {
          console.error('Error while creating task', error);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }



  ngAfterViewInit(): void {
    // Establecer el foco en el botón "Cancel" después de que la vista se haya inicializado completamente
    if (this.cancelButton) {
      this.cancelButton.focus();
    }
  }

}
