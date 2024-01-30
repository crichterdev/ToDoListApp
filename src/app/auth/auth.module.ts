import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../core/auth.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, FormsModule],

})
export class AuthModule {}
