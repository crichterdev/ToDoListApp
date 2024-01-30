import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { DeleteTaskModalComponent } from './delete-task-modal/delete-task-modal.component';

@NgModule({
  declarations: [TodoListComponent, AddTaskModalComponent, EditTaskModalComponent, DeleteTaskModalComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
})
export class TodoModule {}
