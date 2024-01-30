import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AuthenticationResponse } from 'src/app/shared/models/authentication-response';
import { Router } from '@angular/router';


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
