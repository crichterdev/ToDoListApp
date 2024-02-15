import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const destination = this.authService.isLoggedInValue ? '/todo-list' : '/login';
  this.router.navigateByUrl(destination);

  this.authService.isLoggedIn.subscribe((loggedIn) => {
    const destination = loggedIn ? '/todo-list' : '/login';
    this.router.navigateByUrl(destination);
  });
  }
}
