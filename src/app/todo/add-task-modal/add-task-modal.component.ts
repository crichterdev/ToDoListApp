import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoService } from '../todo.service';
import { Task } from 'src/app/shared/models/Task';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskModalComponent {
  taskTitle: string = '';
  isTaskDone: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddTaskModalComponent>,
    private todoService: TodoService
  ) {}

  onSubmit(taskForm: NgForm): void {

    if (this.taskTitle.trim() !== '') {
      const task: Task = {
        id: 0,
        title: taskForm.value.taskTitle,
        isDone: taskForm.value.isTaskDone,
      };

      this.todoService.createTask(task).subscribe(
        (createdTask) => {
          this.dialogRef.close(createdTask);
        },
        (error) => {

        }
      );
    } else {

      console.warn('Title should not be empty');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
