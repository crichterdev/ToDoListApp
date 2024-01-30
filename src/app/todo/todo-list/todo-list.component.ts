import { ChangeDetectionStrategy } from '@angular/core';
// todo-list.component.ts
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Task } from 'src/app/shared/models/Task';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { DeleteTaskModalComponent } from '../delete-task-modal/delete-task-modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private todoService: TodoService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // When initializing the component, load the tasks
    this.loadTasks();
    this.router.events.subscribe((event) => {
      if (event instanceof PopStateEvent) {
        // Here you can perform redirection logic
        sessionStorage.removeItem('jwtToken');
        this.handleBackButton();
      }
    });
  }

  loadTasks(): void {
    // Call the service to get all tasks
    this.todoService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  openAddTaskModal(): void {
    const dialogRef = this.dialog.open(AddTaskModalComponent, {
      width: '500px', // Adjust the width according to your preferences
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Perform actions after closing the modal
      this.loadTasks();
      console.log('The modal was closed with the result:', result);
    });
  }

  openEditTaskModal(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskModalComponent, {
      width: '500px', // Adjust the width according to your preferences
      data: { task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Perform actions after closing the edit modal
      this.loadTasks();
      console.log('The edit modal was closed with the result:', result);
    });
  }

  editTask(taskId: number): void {
    // Logic to edit the task
    // Open the edit modal with the selected task
    const selectedTask = this.tasks.find((task) => task.id === taskId);
    if (selectedTask) {
      this.openEditTaskModal(selectedTask);
    }
  }

  deleteTask(taskId: number): void {
    // Open the delete modal for the selected task
    this.openDeleteTaskModal(taskId);
  }

  openDeleteTaskModal(taskId: number) {
    const dialogRef = this.dialog.open(DeleteTaskModalComponent, {
      width: '500px', // Adjust the width according to your preferences
      data: { taskId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Perform actions after closing the delete modal
      this.loadTasks();
      console.log('The delete modal was closed with the result:', result);
    });
  }

  private handleBackButton(): void {
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
