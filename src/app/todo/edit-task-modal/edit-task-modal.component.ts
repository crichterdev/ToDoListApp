// edit-task-modal.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService } from '../todo.service';
import { Task } from 'src/app/shared/models/Task';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.css'],
})
export class EditTaskModalComponent {
  task: Task;

  constructor(
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private todoService: TodoService
  ) {
    this.task = { ...data.task };
  }

  onSubmit(): void {

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

  onCancel(): void {
    this.dialogRef.close();
  }
}
