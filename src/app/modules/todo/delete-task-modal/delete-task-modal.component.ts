// delete-task-modal.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-delete-task-modal',
  templateUrl: './delete-task-modal.component.html',
  styleUrls: ['./delete-task-modal.component.css'],
})
export class DeleteTaskModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number },
    private todoService: TodoService
  ) {}

  onDelete(): void {

    this.todoService.deleteTask(this.data.taskId).subscribe(
      () => {
        console.log('Tarea eliminada correctamente');

        this.dialogRef.close(true);
      },
      (error) => {

      }
    );
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
