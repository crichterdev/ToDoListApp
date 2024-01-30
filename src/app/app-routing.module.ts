// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { AuthenticationGuardService } from './core/authentication-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/todo-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'todo-list',
    component: TodoListComponent,
    canActivate: [AuthenticationGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
