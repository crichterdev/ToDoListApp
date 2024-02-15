import { Component } from '@angular/core';

import { AuthenticationResponse } from 'src/app/core/models/authentication-response';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response: AuthenticationResponse) => {
        console.log(response);
        sessionStorage.setItem('jwtToken', response.token);
        this.router.navigate(['/todo-list']);
      },
      (error) => {
        console.error('Error de autenticación:', error);
      }
    );
  }
}
