// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from './core/authentication-guard.service';
import { LoginComponent } from './modules/auth/login/login.component';
import { TodoListComponent } from './modules/todo/todo-list/todo-list.component';

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
